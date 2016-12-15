import { SvgPage } from '../page-models';
import { assertPoligonPoints } from '../testing-helpers';

fixture `Svg`
    .page('http://localhost:8080/examples/svg/');

const svgPage = new SvgPage();

test('svg', async t => {
    await t.expect(svgPage.svg.g.count).eql(1)
        .expect(svgPage.svg.g.polygon.count).eql(1)
        .expect(svgPage.svg.g.circle.count).eql(1)
        .expect(svgPage.svg.g.text.count).eql(6)
        .expect(svgPage.labels.count).eql(6)
        .expect(svgPage.buttons.count).eql(7)
        .expect(svgPage.ranges.count).eql(6);
    await assertPoligonPoints(t, 6);

    await t.click(svgPage.buttons.nth(0))
        .expect(svgPage.svg.g.text.count).eql(5)
        .expect(svgPage.labels.count).eql(5)
        .expect(svgPage.ranges.count).eql(5);
    await assertPoligonPoints(t, 5);

    await t.typeText(svgPage.addForm.input, 'foo')
        .click(svgPage.addForm.button)
        .expect(svgPage.svg.g.text.count).eql(6)
        .expect(svgPage.labels.count).eql(6)
        .expect(svgPage.buttons.count).eql(7)
        .expect(svgPage.ranges.count).eql(6);
    await assertPoligonPoints(t, 6);
});
