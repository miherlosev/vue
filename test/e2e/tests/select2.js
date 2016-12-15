import { Select2Page } from '../page-models';

fixture `Select2`
    .page('http://localhost:8080/examples/select2/');

const select2Page = new Select2Page();

test('select2', async t => {
    await t
        .expect(select2Page.select2.fallbackSelect.exists).ok()
        .expect(select2Page.selected.textContent).contains('Selected: 0')
        .expect(select2Page.select2.container.textContent).contains('Select one');

    await t
        .click(select2Page.select2.container.dropdown)
        .expect(select2Page.select2.container.options.count).eql(3)
        .expect(select2Page.select2.container.options.nth(0).textContent).eql('Select one')
        .expect(select2Page.select2.container.options.nth(1).textContent).eql('Hello')
        .expect(select2Page.select2.container.options.nth(0).getAttribute('aria-disabled')).eql('true');

    await t
        .click(select2Page.select2.container.options.nth(1))
        .expect(select2Page.selected.textContent).eql('Selected: 1')
        .expect(select2Page.select2.container.textContent).eql('Hello')

    // test dynamic options
    await t.eval(() => {
        vm.options.push({ id: 3, text: 'Vue' });
    });
    await t
        .click(select2Page.select2.container.dropdown)
        .expect(select2Page.select2.container.options.count).eql(4)
        .expect(select2Page.select2.container.options.nth(0).textContent).eql('Select one')
        .expect(select2Page.select2.container.options.nth(1).textContent).eql('Hello')
        .expect(select2Page.select2.container.options.nth(2).textContent).eql('World')
        .expect(select2Page.select2.container.options.nth(3).textContent).eql('Vue');

    await t
        .click(select2Page.select2.container.options.nth(3))
        .expect(select2Page.select2.container.options.count).eql(0)
        .expect(select2Page.selected.textContent).eql('Selected: 3');

    await t.eval(() => {
        vm.selected = 2;
    });
    await t
        .expect(select2Page.selected.textContent).eql('Selected: 2')
        .expect(select2Page.select2.container.textContent).eql('World');
});

