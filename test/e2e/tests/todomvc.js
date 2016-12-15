import { TodomvcPage } from '../page-models';

fixture `TodoMVC`
    .page('http://localhost:8080/examples/todomvc/#test');

const todomvcPage = new TodomvcPage();

test('todomvc', async t => {
    async function createNewItem (text) {
        await t.typeText(todomvcPage.header.newTodo, text)
            .pressKey('enter');
    }

    async function removeItemAt (n) {
        await t.hover(todomvcPage.main.allItems.nth(n), { offsetX: 10, offsetY: 10 })
            .click(todomvcPage.main.allItems.getDelete(n));
    }

    await t.expect(todomvcPage.main.visible).notOk()
        .expect(todomvcPage.footer.visible).notOk()
        .expect(todomvcPage.footer.filters.selectedItem.count).eql(1)
        .expect(todomvcPage.footer.filters.selectedItem.textContent).eql('All');

    await createNewItem('test');
    await t.expect(todomvcPage.main.allItems.count).eql(1)
        .expect(todomvcPage.main.allItems.getEdit(0).visible).notOk()
        .expect(todomvcPage.main.allItems.getLabel(0).textContent).contains('test')
        .expect(todomvcPage.footer.countLeftItems.textContent).contains('1')
        .expect(todomvcPage.main.allItems.getCheckbox(0).checked).notOk()
        .expect(todomvcPage.main.visible).ok()
        .expect(todomvcPage.footer.visible).ok()
        .expect(todomvcPage.footer.filters.clearCompleted.visible).notOk()
        .expect(todomvcPage.header.newTodo.value).eql('');

    await createNewItem('test2');
    await t.expect(todomvcPage.main.allItems.count).eql(2)
        .expect(todomvcPage.main.allItems.getLabel(1).textContent).contains('test2')
        .expect(todomvcPage.footer.countLeftItems.textContent).contains('2');

    // toggle
    await t.click(todomvcPage.main.allItems.getCheckbox(0))
        .expect(todomvcPage.main.completedItems.count).eql(1)
        .expect(todomvcPage.main.allItems.nth(0).hasClass('completed')).ok()
        .expect(todomvcPage.footer.countLeftItems.textContent).contains('1')
        .expect(todomvcPage.footer.filters.clearCompleted.visible).ok();

    await createNewItem('test3');
    await t.expect(todomvcPage.main.allItems.count).eql(3)
        .expect(todomvcPage.main.allItems.getLabel(2).textContent).contains('test3')
        .expect(todomvcPage.footer.countLeftItems.textContent).contains('2');

    await createNewItem('test4');
    await createNewItem('test5');
    await t.expect(todomvcPage.main.allItems.count).eql(5)
        .expect(todomvcPage.footer.countLeftItems.textContent).contains('4');

    // toggle more
    await t.click(todomvcPage.main.allItems.getCheckbox(3))
        .click(todomvcPage.main.allItems.getCheckbox(4))
        .expect(todomvcPage.main.completedItems.count).eql(3)
        .expect(todomvcPage.footer.countLeftItems.textContent).contains('2');

    // remove
    await removeItemAt(0);
    await t.expect(todomvcPage.main.allItems.count).eql(4)
        .expect(todomvcPage.main.completedItems.count).eql(2)
        .expect(todomvcPage.footer.countLeftItems.textContent).contains('2');

    await removeItemAt(1);
    await t.expect(todomvcPage.main.completedItems.count).eql(2)
        .expect(todomvcPage.footer.countLeftItems.textContent).contains('1');

    // remove all
    await t.click(todomvcPage.footer.filters.clearCompleted)
        .expect(todomvcPage.main.allItems.count).eql(1)
        .expect(todomvcPage.main.allItems.getLabel(0).textContent).contains('test2')
        .expect(todomvcPage.main.completedItems.count).eql(0)
        .expect(todomvcPage.footer.countLeftItems.textContent).contains('1')
        .expect(todomvcPage.footer.filters.clearCompleted.visible).notOk();

    // prepare to test filters
    await createNewItem('test');
    await createNewItem('test');
    await t.click(todomvcPage.main.allItems.getCheckbox(1))
        .click(todomvcPage.main.allItems.getCheckbox(2));

    // active filter
    await t.click(todomvcPage.footer.filters.active)
        .expect(todomvcPage.main.allItems.count).eql(1)
        .expect(todomvcPage.main.completedItems.count).eql(0);

    await createNewItem('test');
    await t.expect(todomvcPage.main.allItems.count).eql(2);

    // complted filter
    await t.click(todomvcPage.footer.filters.completed)
        .expect(todomvcPage.main.allItems.count).eql(2)
        .expect(todomvcPage.main.completedItems.count).eql(2);

    // filter on page load
    await t.navigateTo('http://localhost:8080/examples/todomvc/#active')
        .expect(todomvcPage.main.allItems.count).eql(2)
        .expect(todomvcPage.main.completedItems.count).eql(0)
        .expect(todomvcPage.footer.countLeftItems.textContent).contains('2');

    // completed on page load
    await t.navigateTo('http://localhost:8080/examples/todomvc/#completed')
        .expect(todomvcPage.main.allItems.count).eql(2)
        .expect(todomvcPage.main.completedItems.count).eql(2)
        .expect(todomvcPage.footer.countLeftItems.textContent).contains('2');

    // toggling with filter active
    await t.click(todomvcPage.main.allItems.getCheckbox(0))
        .expect(todomvcPage.main.allItems.count).eql(1)
        .click(todomvcPage.footer.filters.active)
        .expect(todomvcPage.main.allItems.count).eql(3)
        .click(todomvcPage.main.allItems.getCheckbox(0))

    // editing triggered by blur
    await t.click(todomvcPage.footer.filters.all)
        .doubleClick(todomvcPage.main.allItems.getLabel(0))
        .expect(todomvcPage.main.allItems.getEdit(0).focused).ok();

    await t.typeText(todomvcPage.main.allItems.getEdit(0), 'edited!', { replace: true })
        .click(todomvcPage.footer, { offsetX: 0, offsetY: 0 }) // blur
        .expect(todomvcPage.main.find('.todo.editing').count).eql(0)
        .expect(todomvcPage.main.allItems.getLabel(0).textContent).contains('edited!');

    // editing triggered by enter
    await t.doubleClick(todomvcPage.main.allItems.getLabel(0))
        .typeText(todomvcPage.main.allItems.getEdit(0), 'edited again!', { replace: true })
        .pressKey('enter')
        .expect(todomvcPage.main.find('.todo.editing').count).eql(0)
        .expect(todomvcPage.main.allItems.getLabel(0).textContent).contains('edited again!');

    // cancel
    await t.doubleClick(todomvcPage.main.allItems.getLabel(0))
        .typeText(todomvcPage.main.allItems.getEdit(0), 'edited!')
        .pressKey('esc')
        .expect(todomvcPage.main.find('.todo.editing').count).eql(0)
        .expect(todomvcPage.main.allItems.getLabel(0).textContent).contains('edited again!');

    // empty value should remove
    await t.doubleClick(todomvcPage.main.allItems.getLabel(0))
        .typeText(todomvcPage.main.allItems.getEdit(0), ' ', { replace: true })
        .pressKey('enter')
        .expect(todomvcPage.main.allItems.count).eql(3);

    // toggle all
    await t.click(todomvcPage.main.toggleAll)
        .expect(todomvcPage.main.completedItems.count).eql(3)
        .click(todomvcPage.main.toggleAll)
        .expect(todomvcPage.main.completedItems.count).eql(0);
});
