// Package docs Code generated by swaggo/swag. DO NOT EDIT
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "contact": {},
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/boards": {
            "get": {
                "description": "Возвращает массив досок с основной информацией и количеством задач в каждой",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Доски"
                ],
                "summary": "Получить список всех досок",
                "responses": {
                    "200": {
                        "description": "Успешный ответ со списком досок",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/models.GetBoardsResponse"
                            }
                        }
                    },
                    "500": {
                        "description": "Внутренняя ошибка сервера",
                        "schema": {
                            "$ref": "#/definitions/errs.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/boards/{boardId}": {
            "get": {
                "description": "Возвращает все задачи, принадлежащие указанной доске",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Доски"
                ],
                "summary": "Получить задачи доски",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "ID доски",
                        "name": "boardId",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/models.GetTasksOnBoardResponse"
                            }
                        }
                    },
                    "400": {
                        "description": "Неверный формат ID доски",
                        "schema": {
                            "$ref": "#/definitions/errs.ErrorResponse"
                        }
                    },
                    "404": {
                        "description": "Доска не найдена",
                        "schema": {
                            "$ref": "#/definitions/errs.ErrorResponse"
                        }
                    },
                    "500": {
                        "description": "Ошибка сервера",
                        "schema": {
                            "$ref": "#/definitions/errs.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/tasks": {
            "get": {
                "description": "Возвращает массив задач с полной информацией, включая данные исполнителей и досок",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Задачи"
                ],
                "summary": "Получить список всех задач",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/models.GetTasksResponse"
                            }
                        }
                    },
                    "500": {
                        "description": "Внутренняя ошибка сервера",
                        "schema": {
                            "$ref": "#/definitions/errs.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/tasks/create": {
            "post": {
                "description": "Создает новую задачу с указанными параметрами",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Задачи"
                ],
                "summary": "Создать новую задачу",
                "parameters": [
                    {
                        "description": "Данные для создания задачи",
                        "name": "input",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/models.CreateTaskRequest"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Задача успешно создана",
                        "schema": {
                            "$ref": "#/definitions/models.CreateTaskResponse"
                        }
                    },
                    "400": {
                        "description": "Неверный формат данных или параметры",
                        "schema": {
                            "$ref": "#/definitions/errs.ErrorResponse"
                        }
                    },
                    "404": {
                        "description": "Доска или пользователь не найдены",
                        "schema": {
                            "$ref": "#/definitions/errs.ErrorResponse"
                        }
                    },
                    "500": {
                        "description": "Ошибка сервера при создании задачи",
                        "schema": {
                            "$ref": "#/definitions/errs.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/tasks/update/{taskId}": {
            "put": {
                "description": "Обновляет задачу по указанному ID",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Задачи"
                ],
                "summary": "Обновить задачу",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "ID задачи",
                        "name": "taskId",
                        "in": "path",
                        "required": true
                    },
                    {
                        "description": "Данные для обновления задачи",
                        "name": "input",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/models.UpdateTaskRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/models.UpdateTaskResponse"
                        }
                    },
                    "400": {
                        "description": "Некорректные данные",
                        "schema": {
                            "$ref": "#/definitions/errs.ErrorResponse"
                        }
                    },
                    "404": {
                        "description": "Задача не найдена",
                        "schema": {
                            "$ref": "#/definitions/errs.ErrorResponse"
                        }
                    },
                    "500": {
                        "description": "Ошибка при обновлении задачи",
                        "schema": {
                            "$ref": "#/definitions/errs.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/tasks/updateStatus/{taskId}": {
            "put": {
                "description": "Обновляет статус задачи по указанному ID",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Задачи"
                ],
                "summary": "Обновить статус задачи",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "ID задачи",
                        "name": "taskId",
                        "in": "path",
                        "required": true
                    },
                    {
                        "description": "Данные для обновления статуса задачи",
                        "name": "input",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/models.UpdateTaskStatusRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/models.UpdateTaskStatusResponse"
                        }
                    },
                    "400": {
                        "description": "Некорректные данные",
                        "schema": {
                            "$ref": "#/definitions/errs.ErrorResponse"
                        }
                    },
                    "404": {
                        "description": "Задача не найдена",
                        "schema": {
                            "$ref": "#/definitions/errs.ErrorResponse"
                        }
                    },
                    "500": {
                        "description": "Ошибка при обновлении статуса задачи",
                        "schema": {
                            "$ref": "#/definitions/errs.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/tasks/{taskId}": {
            "get": {
                "description": "Возвращает полную информацию о задаче, включая данные исполнителя и доски",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Задачи"
                ],
                "summary": "Получить задачу по ID",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "ID задачи",
                        "name": "taskId",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/models.GetTaskByIDResponse"
                        }
                    },
                    "400": {
                        "description": "Некорректный ID задачи",
                        "schema": {
                            "$ref": "#/definitions/errs.ErrorResponse"
                        }
                    },
                    "404": {
                        "description": "Задача не найдена",
                        "schema": {
                            "$ref": "#/definitions/errs.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/teams": {
            "get": {
                "description": "Получает информацию о всех командах, включая количество пользователей и досок",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Команды"
                ],
                "summary": "Получить информацию о всех командах",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/models.GetTeamsResponse"
                            }
                        }
                    },
                    "500": {
                        "description": "Ошибка при получении команд",
                        "schema": {
                            "$ref": "#/definitions/errs.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/teams/{teamId}": {
            "get": {
                "description": "Получает информацию о команде по ID, включая пользователей и доски",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    ""
                ],
                "summary": "Получить информацию о команде",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "ID команды",
                        "name": "teamId",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/models.GetTeamResponse"
                        }
                    },
                    "400": {
                        "description": "Некорректный teamID",
                        "schema": {
                            "$ref": "#/definitions/errs.ErrorResponse"
                        }
                    },
                    "404": {
                        "description": "Команда не найдена",
                        "schema": {
                            "$ref": "#/definitions/errs.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/users": {
            "get": {
                "description": "Получает информацию о всех пользователях, включая их команды и количество задач",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Пользователи"
                ],
                "summary": "Получить информацию о всех пользователях",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/models.GetUsersResponse"
                            }
                        }
                    },
                    "500": {
                        "description": "Ошибка при получении пользователей",
                        "schema": {
                            "$ref": "#/definitions/errs.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/users/{id}/tasks": {
            "get": {
                "description": "Получает список задач для указанного пользователя по его ID",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Пользователи"
                ],
                "summary": "Получить задачи пользователя",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "ID пользователя",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/models.GetUserTasksResponse"
                            }
                        }
                    },
                    "400": {
                        "description": "Некорректный userID",
                        "schema": {
                            "$ref": "#/definitions/errs.ErrorResponse"
                        }
                    },
                    "500": {
                        "description": "Ошибка при получении задач пользователя",
                        "schema": {
                            "$ref": "#/definitions/errs.ErrorResponse"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "errs.ErrorResponse": {
            "type": "object",
            "properties": {
                "error": {
                    "type": "string"
                },
                "message": {
                    "type": "string"
                }
            }
        },
        "models.AssigneeUserForTask": {
            "description": "Упрощенная модель пользователя для отображения в задачах",
            "type": "object",
            "properties": {
                "avatarUrl": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "fullName": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                }
            }
        },
        "models.CreateTaskRequest": {
            "description": "Запрос на создание новой задачи",
            "type": "object",
            "required": [
                "assigneeId",
                "boardId",
                "description",
                "title"
            ],
            "properties": {
                "assigneeId": {
                    "type": "integer"
                },
                "boardId": {
                    "type": "integer"
                },
                "description": {
                    "type": "string",
                    "maxLength": 500,
                    "minLength": 1
                },
                "priority": {
                    "type": "string",
                    "enum": [
                        "Low",
                        "Medium",
                        "High"
                    ],
                    "example": "Medium"
                },
                "title": {
                    "type": "string",
                    "maxLength": 100,
                    "minLength": 1
                }
            }
        },
        "models.CreateTaskResponse": {
            "description": "Ответ после успешного создания задачи",
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer"
                }
            }
        },
        "models.GetBoardsResponse": {
            "description": "Содержит основную информацию о доске и количество задач",
            "type": "object",
            "properties": {
                "description": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "name": {
                    "type": "string"
                },
                "taskCount": {
                    "type": "integer"
                }
            }
        },
        "models.GetTaskByIDResponse": {
            "description": "Содержит полные данные задачи, включая информацию об исполнителе и доске",
            "type": "object",
            "properties": {
                "assignee": {
                    "$ref": "#/definitions/models.AssigneeUserForTask"
                },
                "boardName": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "priority": {
                    "type": "string",
                    "enum": [
                        "Low",
                        "Medium",
                        "High"
                    ],
                    "example": "High"
                },
                "status": {
                    "type": "string",
                    "enum": [
                        "Backlog",
                        "InProgress",
                        "Done"
                    ],
                    "example": "Done"
                },
                "title": {
                    "type": "string"
                }
            }
        },
        "models.GetTasksOnBoardResponse": {
            "description": "Ответ с данными задач, принадлежащих конкретной доске",
            "type": "object",
            "properties": {
                "assignee": {
                    "$ref": "#/definitions/models.AssigneeUserForTask"
                },
                "description": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "priority": {
                    "type": "string",
                    "enum": [
                        "Low",
                        "Medium",
                        "High"
                    ],
                    "example": "Medium"
                },
                "status": {
                    "type": "string",
                    "enum": [
                        "Backlog",
                        "InProgress",
                        "Done"
                    ],
                    "example": "Done"
                },
                "title": {
                    "type": "string"
                }
            }
        },
        "models.GetTasksResponse": {
            "description": "Содержит основные данные о задачах с информацией об исполнителях и досках",
            "type": "object",
            "properties": {
                "assignee": {
                    "$ref": "#/definitions/models.AssigneeUserForTask"
                },
                "assigneeId": {
                    "type": "integer"
                },
                "boardId": {
                    "type": "integer"
                },
                "boardName": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "priority": {
                    "type": "string",
                    "enum": [
                        "Low",
                        "Medium",
                        "High"
                    ],
                    "example": "Medium"
                },
                "status": {
                    "type": "string",
                    "enum": [
                        "Backlog",
                        "InProgress",
                        "Done"
                    ],
                    "example": "Done"
                },
                "title": {
                    "type": "string"
                }
            }
        },
        "models.GetTeamBoards": {
            "description": "Содержит данные о досках, принадлежащих команде",
            "type": "object",
            "properties": {
                "description": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "name": {
                    "type": "string"
                }
            }
        },
        "models.GetTeamResponse": {
            "description": "Содержит данные о команде, включая пользователей и доски",
            "type": "object",
            "properties": {
                "boards": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/models.GetTeamBoards"
                    }
                },
                "description": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "name": {
                    "type": "string"
                },
                "users": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/models.GetTeamUsers"
                    }
                }
            }
        },
        "models.GetTeamUsers": {
            "description": "Содержит данные о пользователях, принадлежащих команде",
            "type": "object",
            "properties": {
                "avatarUrl": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "fullName": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                }
            }
        },
        "models.GetTeamsResponse": {
            "description": "Содержит данные о команде, включая количество пользователей и досок",
            "type": "object",
            "properties": {
                "boardsCount": {
                    "type": "integer"
                },
                "description": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "name": {
                    "type": "string"
                },
                "usersCount": {
                    "type": "integer"
                }
            }
        },
        "models.GetUserTasksResponse": {
            "description": "Содержит данные о задаче, включая информацию о доске",
            "type": "object",
            "properties": {
                "boardName": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "priority": {
                    "type": "string",
                    "enum": [
                        "Low",
                        "Medium",
                        "High"
                    ],
                    "example": "Medium"
                },
                "status": {
                    "type": "string",
                    "enum": [
                        "Backlog",
                        "InProgress",
                        "Done"
                    ],
                    "example": "Done"
                },
                "title": {
                    "type": "string"
                }
            }
        },
        "models.GetUsersResponse": {
            "description": "Содержит данные о пользователе, включая информацию о команде и количестве задач",
            "type": "object",
            "properties": {
                "avatarUrl": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "fullName": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "tasksCount": {
                    "type": "integer"
                },
                "teamId": {
                    "type": "integer"
                },
                "teamName": {
                    "type": "string"
                }
            }
        },
        "models.UpdateTaskRequest": {
            "description": "Запрос на обновление существующей задачи",
            "type": "object",
            "required": [
                "assigneeId",
                "description",
                "title"
            ],
            "properties": {
                "assigneeId": {
                    "type": "integer"
                },
                "description": {
                    "type": "string",
                    "maxLength": 500,
                    "minLength": 1
                },
                "priority": {
                    "type": "string",
                    "enum": [
                        "Low",
                        "Medium",
                        "High"
                    ],
                    "example": "Medium"
                },
                "status": {
                    "type": "string",
                    "enum": [
                        "Backlog",
                        "InProgress",
                        "Done"
                    ],
                    "example": "Done"
                },
                "title": {
                    "type": "string",
                    "maxLength": 100,
                    "minLength": 1
                }
            }
        },
        "models.UpdateTaskResponse": {
            "description": "Ответ после успешного обновления задачи",
            "type": "object",
            "properties": {
                "message": {
                    "type": "string"
                }
            }
        },
        "models.UpdateTaskStatusRequest": {
            "type": "object",
            "properties": {
                "status": {
                    "type": "string",
                    "enum": [
                        "Backlog",
                        "InProgress",
                        "Done"
                    ],
                    "example": "Done"
                }
            }
        },
        "models.UpdateTaskStatusResponse": {
            "type": "object",
            "properties": {
                "message": {
                    "type": "string"
                }
            }
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "1.0",
	Host:             "localhost:8080",
	BasePath:         "/api/v1",
	Schemes:          []string{},
	Title:            "Avito FE Tech Internship 2025 Wave 2 API",
	Description:      "API для управления задачами и досками",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
	LeftDelim:        "{{",
	RightDelim:       "}}",
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
