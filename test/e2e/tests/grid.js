import { GridPage } from '../page-models';
import { assertTable } from '../testing-helpers';
import gridManipulationResults from '../grid-manipulation-results';

fixture `Grid`
    .page('http://localhost:8080/examples/grid/');

const gridPage = new GridPage();

test('grid', async t => {
    await t
        .expect(gridPage.table.find('th').count).eql(2)
        .expect(gridPage.table.find('th.active').count).eql(0)
        .expect(gridPage.table.find('th:nth-child(1)').textContent).contains('Name')
        .expect(gridPage.table.find('th:nth-child(2)').textContent).contains('Power');
    await assertTable(t, gridPage.table, gridManipulationResults.defaultSort);

    await t.click(gridPage.table.find('th').nth(0));
    await assertTable(t, gridPage.table, gridManipulationResults.byNameDesc);

    await t.click(gridPage.table.find('th').nth(1));
    await assertTable(t, gridPage.table, gridManipulationResults.byPowerAsc);

    await t.click(gridPage.table.find('th').nth(1));
    await assertTable(t, gridPage.table, gridManipulationResults.byPowerDesc);

    await t.click(gridPage.table.find('th').nth(0));
    await assertTable(t, gridPage.table, gridManipulationResults.byNameAsc);

    await t.typeText(gridPage.query, 'infinity');
    await assertTable(t, gridPage.table, gridManipulationResults.filterByName);

    await t
        .pressKey('ctrl+a delete')
        .expect(gridPage.noMatchesFound.count).eql(0)
        .typeText(gridPage.query, 'stringthatdoesnotexistanywhere')
        .expect(gridPage.noMatchesFound.count).eql(1);
});

