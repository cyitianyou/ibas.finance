/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace finance {
    export namespace ui {
        export namespace c {
            /** 编辑视图-项目 */
            export class ProjectEditView extends ibas.BOEditView implements app.IProjectEditView {
                /** 删除数据事件 */
                deleteDataEvent: Function;
                /** 新建数据事件，参数1：是否克隆 */
                createDataEvent: Function;
                /** 选择组织 */
                chooseOrganizationEvent: Function;
                /** 选择项目经理 */
                chooseManagerEvent: Function;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    let formTop: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("finance_title_general") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_project_code") }),
                            new sap.m.Input("", {
                                type: sap.m.InputType.Text
                            }).bindProperty("value", {
                                path: "code"
                            }).bindProperty("editable", {
                                path: "series",
                                formatter(data: any): any {
                                    return data > 0 ? false : true;
                                }
                            }),
                            new sap.m.ex.SeriesSelect("", {
                                objectCode: ibas.config.applyVariables(bo.BO_CODE_PROJECT),
                                bindingValue: {
                                    path: "series",
                                    type: "sap.ui.model.type.Integer",
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_project_name") }),
                            new sap.m.Input("", {
                                type: sap.m.InputType.Text
                            }).bindProperty("value", {
                                path: "name"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_project_manager") }),
                            new sap.m.ex.BOInput("", {
                                boText: "name",
                                boKey: "docEntry",
                                boCode: ibas.config.applyVariables(initialfantasy.bo.BO_CODE_USER),
                                repositoryName: initialfantasy.bo.BO_REPOSITORY_INITIALFANTASY,
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseManagerEvent);
                                },
                                bindingValue: {
                                    path: "manager"
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_project_activated") }),
                            new sap.m.Select("", {
                                items: openui5.utils.createComboBoxItems(ibas.emYesNo)
                            }).bindProperty("selectedKey", {
                                path: "activated",
                                type: "sap.ui.model.type.Integer"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_project_organization") }),
                            new sap.m.ex.BOInput("", {
                                boText: "name",
                                boKey: "code",
                                boCode: ibas.config.applyVariables(initialfantasy.bo.BO_CODE_ORGANIZATION),
                                repositoryName: initialfantasy.bo.BO_REPOSITORY_INITIALFANTASY,
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseOrganizationEvent);
                                },
                                bindingValue: {
                                    path: "organization"
                                }
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("finance_title_others") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_project_docentry") }),
                            new sap.m.Input("", {
                                enabled: false,
                                type: sap.m.InputType.Text
                            }).bindProperty("value", {
                                path: "docEntry"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_project_objectcode") }),
                            new sap.m.Input("", {
                                enabled: false,
                                type: sap.m.InputType.Text
                            }).bindProperty("value", {
                                path: "objectCode"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_project_reference1") }),
                            new sap.m.Input("", {
                                type: sap.m.InputType.Text
                            }).bindProperty("value", {
                                path: "reference1"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_project_reference2") }),
                            new sap.m.Input("", {
                                type: sap.m.InputType.Text
                            }).bindProperty("value", {
                                path: "reference2"
                            }),
                        ]
                    });
                    this.page = new sap.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_save"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://save",
                                    press: function (): void {
                                        that.fireViewEvents(that.saveDataEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_delete"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://delete",
                                    press: function (): void {
                                        that.fireViewEvents(that.deleteDataEvent);
                                    }
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.MenuButton("", {
                                    text: ibas.strings.format("{0}/{1}",
                                        ibas.i18n.prop("shell_data_new"), ibas.i18n.prop("shell_data_clone")),
                                    icon: "sap-icon://create",
                                    type: sap.m.ButtonType.Transparent,
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("shell_data_new"),
                                                icon: "sap-icon://create",
                                                press: function (): void {
                                                    // 创建新的对象
                                                    that.fireViewEvents(that.createDataEvent, false);
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("shell_data_clone"),
                                                icon: "sap-icon://copy",
                                                press: function (): void {
                                                    // 复制当前对象
                                                    that.fireViewEvents(that.createDataEvent, true);
                                                }
                                            }),
                                        ],
                                    })
                                }),
                            ]
                        }),
                        content: [
                            new sap.ui.layout.VerticalLayout("", {
                                width: "100%",
                                content: [
                                    formTop,
                                ]
                            })
                        ]
                    });
                    return this.page;
                }

                private page: sap.m.Page;

                /** 改变视图状态 */
                private changeViewStatus(data: bo.Project): void {
                    if (ibas.objects.isNull(data)) {
                        return;
                    }
                    // 新建时：禁用删除，
                    if (data.isNew) {
                        if (this.page.getSubHeader() instanceof sap.m.Toolbar) {
                            openui5.utils.changeToolbarSavable(<sap.m.Toolbar>this.page.getSubHeader(), true);
                            openui5.utils.changeToolbarDeletable(<sap.m.Toolbar>this.page.getSubHeader(), false);
                        }
                    }
                }

                /** 显示数据 */
                showProject(data: bo.Project): void {
                    this.page.setModel(new sap.ui.model.json.JSONModel(data));
                    this.page.bindObject("/");
                    // 监听属性改变，并更新控件
                    openui5.utils.refreshModelChanged(this.page, data);
                    // 改变视图状态
                    this.changeViewStatus(data);
                }
            }
        }
    }
}
