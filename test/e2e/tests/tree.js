import { TreePage } from '../page-models';

fixture `Tree`
    .page('http://localhost:8080/examples/tree/');

const treePage = new TreePage();

test('tree', async t => {
    await t
        .expect(treePage.allItems.count).eql(12)
        .expect(treePage.allAddItems.count).eql(4)
        .expect(treePage.allChildFolders.count).eql(4)
        .expect(treePage.topLevelRoot.childNodesContainer.visible).notOk()
        .expect(treePage.topLevelRoot.name.textContent).contains('[+]');

    // expand root
    await t
        .click(treePage.topLevelRoot.name)
        .expect(treePage.topLevelRoot.childNodesContainer.visible).ok()
        .expect(treePage.topLevelRoot.childNodesContainer.child().count).eql(4)
        .expect(treePage.topLevelRoot.name.textContent).contains('[-]')
        .expect(treePage.topLevelRoot.childNodesContainer.child(0).textContent).contains('hello')
        .expect(treePage.topLevelRoot.childNodesContainer.child(1).textContent).contains('wat')
        .expect(treePage.topLevelRoot.childNodesContainer.child(2).textContent).contains('child folder')
        .expect(treePage.topLevelRoot.childNodesContainer.child(3).textContent).contains('+');

    // // add items to root
    await t
        .click(treePage.topLevelRoot.addNew)
        .expect(treePage.topLevelRoot.childNodesContainer.child().count).eql(5)
        .expect(treePage.topLevelRoot.childNodesContainer.child(0).textContent).contains('hello')
        .expect(treePage.topLevelRoot.childNodesContainer.child(1).textContent).contains('wat')
        .expect(treePage.topLevelRoot.childNodesContainer.child(2).textContent).contains('child folder')
        .expect(treePage.topLevelRoot.childNodesContainer.child(3).textContent).contains('new stuff')
        .expect(treePage.topLevelRoot.childNodesContainer.child(4).textContent).contains('+');

    // // add another item
    await t
        .click(treePage.topLevelRoot.addNew)
        .expect(treePage.topLevelRoot.childNodesContainer.child().count).eql(6)
        .expect(treePage.topLevelRoot.childNodesContainer.child(0).textContent).contains('hello')
        .expect(treePage.topLevelRoot.childNodesContainer.child(1).textContent).contains('wat')
        .expect(treePage.topLevelRoot.childNodesContainer.child(2).textContent).contains('child folder')
        .expect(treePage.topLevelRoot.childNodesContainer.child(3).textContent).contains('new stuff')
        .expect(treePage.topLevelRoot.childNodesContainer.child(4).textContent).contains('new stuff')
        .expect(treePage.topLevelRoot.childNodesContainer.child(5).textContent).contains('+');

    await t.click(treePage.topLevelRoot.childNodesContainer.child(2));

    const secondLevelRoot = treePage.createModelFromNode(treePage.topLevelRoot.childNodesContainer.child(2));

    await t
        .expect(secondLevelRoot.childNodesContainer.visible).ok()
        .expect(secondLevelRoot.name.textContent).contains('[-]')
        .expect(secondLevelRoot.childNodesContainer.child().count).eql(5);

    await t
        .click(treePage.topLevelRoot.name)
        .expect(treePage.topLevelRoot.childNodesContainer.visible).notOk()
        .expect(treePage.topLevelRoot.name.textContent).contains('[+]');

    await t
        .click(treePage.topLevelRoot.name)
        .expect(treePage.topLevelRoot.childNodesContainer.visible).ok()
        .expect(treePage.topLevelRoot.name.textContent).contains('[-]');

    await t
        .doubleClick(treePage.topLevelRoot.childNodesContainer.child(0))
        .expect(treePage.allItems.count).eql(15)
        .expect(treePage.allChildFolders.count).eql(5);

    const helloTreeItem = treePage.createModelFromNode(treePage.topLevelRoot.childNodesContainer.child(0));

    await t
        .expect(helloTreeItem.name.textContent).contains('[-]')
        .expect(helloTreeItem.childNodesContainer.child().count).eql(2);
});
