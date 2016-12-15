import { CommitsPage } from '../page-models';

fixture `Commits`
    .page('http://localhost:8080/examples/commits/');

const commitsPage = new CommitsPage();

test('commits', async t => {
    await t
        .expect(commitsPage.branch.inputs.count).eql(2)
        .expect(commitsPage.branch.labels.count).eql(2)
        .expect(commitsPage.branch.labelForMaster.textContent).contains('master')
        .expect(commitsPage.branch.labelForDev.textContent).contains('dev')
        .expect(commitsPage.branch.master.checked).ok()
        .expect(commitsPage.branch.dev.checked).notOk()
        .expect(commitsPage.branch.current.textContent).contains('vuejs/vue@master')
        .expect(commitsPage.commits.allItems.count).eql(3)
        .expect(commitsPage.commits.ids.count).eql(3)
        .expect(commitsPage.commits.messages.count).eql(3)

    await t
        .click(commitsPage.branch.dev)
        .expect(commitsPage.branch.current.textContent).contains('vuejs/vue@dev')
        .expect(commitsPage.commits.allItems.count).eql(3)
        .expect(commitsPage.commits.ids.count).eql(3)
        .expect(commitsPage.commits.messages.count).eql(3);
});
