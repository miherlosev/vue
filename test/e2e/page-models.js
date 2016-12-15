import { Selector } from 'testcafe';

class CommitCollection {
    constructor (itemsSelector) {
        this.allItems = Selector(itemsSelector);
        this.ids      = this.allItems.find('.commit');
        this.messages = this.allItems.find('.message');
    }
}

export class CommitsPage {
    constructor () {
        this.branch = {
            current:        Selector('p'),
            labelForMaster: Selector('label[for="master"]'),
            labelForDev:    Selector('label[for="dev"]'),
            master:         Selector('#master'),
            dev:            Selector('#dev'),
            inputs:         Selector('input'),
            labels:         Selector('label')
        };

        this.commits = new CommitCollection('li');
    }
}

export class GridPage {
    constructor () {
        this.table          = Selector('table');
        this.query          = Selector('input[name="query"]');
        this.noMatchesFound = Selector('p');
    }
}

export class MarkdownPage {
    constructor () {
        this.editor = Selector('#editor');
        this.src    = this.editor.find('textarea');
        this.result = this.editor.find('div');
    }
}

class ModalControl {
    constructor (selector) {
        this.mainElement                    = Selector(selector);
        this.wrapper                        = this.mainElement.find('.modal-wrapper');
        this.container                      = this.wrapper.find('.modal-container');
        this.container.header               = this.container.find('.modal-header');
        this.container.body                 = this.container.find('.modal-body');
        this.container.footer               = this.container.find('.modal-footer');
        this.container.footer.defaultButton = this.container.find('.modal-default-button');
    }
}

export class ModalPage {
    constructor () {
        this.showModalBtn = Selector('#show-modal');
        this.modal        = new ModalControl('.modal-mask');
    }
}

class Select2 {
    constructor (selector) {
        this.fallbackSelect     = Selector(selector);
        this.container          = Selector('span.select2-container');
        this.container.dropdown = this.container.find('.select2-selection__rendered');
        this.container.options  = this.container.find('.select2-results__option')
    }
}

export class Select2Page {
    constructor () {
        this.selected = Selector('p');
        this.select2  = new Select2('select');
    }
}

export class SvgPage {
    constructor () {
        this.svg = {
            g: Selector('g')
        };

        this.svg.g.polygon = this.svg.g.find('polygon');
        this.svg.g.circle  = this.svg.g.find('circle');
        this.svg.g.text    = this.svg.g.find('text');

        this.ranges  = Selector('input[type="range"]');
        this.labels  = Selector('label');
        this.buttons = Selector('button');

        this.addForm = {
            input:  Selector('input[name="newlabel"]'),
            button: Selector('#add > button')
        };
    }
}

export class TodomvcPage {
    constructor () {
        this.header         = Selector('.header');
        this.header.newTodo = this.header.find('.new-todo');

        this.main                      = Selector('.main');
        this.main.allItems             = this.main.find('li.todo');
        this.main.completedItems       = this.main.find('li.todo.completed');
        this.main.allItems.getLabel    = (index) => this.main.allItems.nth(index).find('label');
        this.main.allItems.getCheckbox = (index) => this.main.allItems.nth(index).find('.toggle');
        this.main.allItems.getEdit     = (index) => this.main.allItems.nth(index).find('.edit');
        this.main.allItems.getDelete   = (index) => this.main.allItems.nth(index).find('.destroy');
        this.main.toggleAll            = this.main.find('.toggle-all');

        this.footer                        = Selector('.footer');
        this.footer.filters                = this.footer.find('.filters');
        this.footer.filters.all            = this.footer.filters.find('a').withText('All');
        this.footer.filters.active         = this.footer.filters.find('a').withText('Active');
        this.footer.filters.completed      = this.footer.filters.find('a').withText('Completed');
        this.footer.filters.clearCompleted = this.footer.find('.clear-completed');
        this.footer.filters.selectedItem   = this.footer.filters.find('.selected');
        this.footer.countLeftItems         = this.footer.find('.todo-count strong');
    }
}

class TreeNode {
    constructor (nodeSelector) {
        this.node                = Selector(nodeSelector);
        this.name                = this.node.child('div');
        this.childNodesContainer = this.node.child('ul');
        this.addNew              = this.childNodesContainer.child('li.add');
    }
}

export class TreePage {
    constructor () {
        this.allItems        = Selector('.item');
        this.allAddItems     = Selector('.add');
        this.allChildFolders = this.allItems.find('ul');

        this.createModelFromNode = (node) => new TreeNode(node);
        this.root                = Selector('#demo');
        this.topLevelRoot        = this.createModelFromNode(this.root.child('li'));
    }
}

