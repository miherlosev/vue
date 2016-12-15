import { MarkdownPage } from '../page-models';
import { getInnerHtml } from '../testing-helpers';

fixture `Markdown`
    .page('http://localhost:8080/examples/markdown/');

const markdownPage = new MarkdownPage();

test('markdown', async t => {
    await t.expect(markdownPage.src.value).eql('# hello')
        .expect(await getInnerHtml(markdownPage.result)).contains('<h1 id="hello">hello</h1>');

    await t.typeText(markdownPage.src, '\n## foo\n\n- bar\n- baz', { replace: true })
        .expect(await getInnerHtml(markdownPage.result)).contains('<h1 id="hello">hello</h1>');

    await t.wait(1500);
    await t.expect(await getInnerHtml(markdownPage.result)).contains(
        '<h2 id="foo">foo</h2>\n' +
        '<ul>\n<li>bar</li>\n<li>baz</li>\n</ul>'
    );
});


