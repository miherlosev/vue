import { ModalPage } from '../page-models';

fixture `Modal`
    .page('http://localhost:8080/examples/modal/');

const modalPage = new ModalPage();

test('modal', async t => {
    await t.click(modalPage.showModalBtn)
        .expect(modalPage.modal.mainElement.exists).ok()
        .expect(modalPage.modal.wrapper.exists).ok()
        .expect(modalPage.modal.container.exists).ok()
        .expect(modalPage.modal.mainElement.hasClass('modal-enter-active')).ok()
        .expect(modalPage.modal.mainElement.hasClass('modal-enter-active')).notOk()
        .expect(modalPage.modal.container.header.find('h3').innerText).contains('custom header')
        .expect(modalPage.modal.container.body.innerText).contains('default body')
        .expect(modalPage.modal.container.footer.innerText).contains('default footer');

    await t.click(modalPage.modal.container.footer.defaultButton)
        .expect(modalPage.modal.mainElement.exists).ok()
        .expect(modalPage.modal.mainElement.hasClass('modal-leave-active')).ok()
        .expect(modalPage.modal.mainElement.exists).notOk();
});
