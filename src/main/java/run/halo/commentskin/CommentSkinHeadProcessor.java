package run.halo.commentskin;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.ITemplateContext;
import org.thymeleaf.model.IModel;
import org.thymeleaf.model.IModelFactory;
import org.thymeleaf.processor.element.IElementModelStructureHandler;
import reactor.core.publisher.Mono;
import run.halo.app.theme.dialect.TemplateHeadProcessor;

/**
 * Appends the comment skin to the head of every theme-rendered page.
 *
 * <p>The host-level custom properties are inlined as a style element so they are
 * available before the widget upgrades, and the shadow-root styles come with an
 * inline script because the widget renders into an open shadow root that page
 * CSS cannot reach. Both assets are shipped inside the plugin JAR and cached in
 * memory after the first read.
 */
@Component
public class CommentSkinHeadProcessor implements TemplateHeadProcessor {

    private static final String STYLE_RESOURCE = "static/comment-skin.css";
    private static final String SCRIPT_RESOURCE = "static/comment-skin.js";

    private volatile String headContent;

    @Override
    public Mono<Void> process(ITemplateContext context, IModel model,
                              IElementModelStructureHandler structureHandler) {
        final String head = headContent();
        if (head == null || head.isBlank()) {
            return Mono.empty();
        }
        final IModelFactory modelFactory = context.getModelFactory();
        model.add(modelFactory.createText(head));
        return Mono.empty();
    }

    private String headContent() {
        String content = headContent;
        if (content != null) {
            return content;
        }
        final String style = read(STYLE_RESOURCE);
        final String script = read(SCRIPT_RESOURCE);
        if (style == null || script == null) {
            return null;
        }
        content = """
            <!-- plugin-comment-skin start -->
            <style data-comment-skin>%s</style>
            <script data-comment-skin>%s</script>
            <!-- plugin-comment-skin end -->
            """.formatted(style, script);
        headContent = content;
        return content;
    }

    private String read(String resource) {
        try (InputStream input = getClass().getClassLoader().getResourceAsStream(resource)) {
            if (input == null) {
                return null;
            }
            return new String(input.readAllBytes(), StandardCharsets.UTF_8);
        } catch (IOException e) {
            return null;
        }
    }
}