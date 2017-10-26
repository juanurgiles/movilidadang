import {
    DynamicFormControlModel,
    DynamicCheckboxModel,
    DynamicInputModel,
    DynamicFormGroupModel,
    DynamicRadioGroupModel,
    DynamicSelectModel
} from '@ng-dynamic-forms/core';

export const MY_FORM_MODEL: DynamicFormControlModel[] = [
    new DynamicFormGroupModel({

        id: 'formGroup1',
        legend: 'Form Group 1',

        group: [
            new DynamicRadioGroupModel<string>({

                id: "rolprincipal",
                label: "1. Identifique su rol principal en la comunidad universitaria",
                options: [
                    {
                        label: "Esudiante",
                        value: "Estudiante",
                    },
                    {
                        label: "Docente",
                        value: "Docente"
                    },
                    {
                        label: "Personal Administrativo/Trabajador",
                        value: "Personal Administrativo/Trabajador"
                    },
                    {
                        label: "Otro",
                        value: "Otro"
                    }
                ],
                value: "option-3",

            }),
            new DynamicInputModel({

                id: 'input1',
                label: '   Detalle cual?',
                validators: {
                    required: null
                },
                list: ["Estudiante", "Docente",
                    "Personal Administrativo/Trabajador", "Otro"],
                errorMessages: {
                    required: 'Se requiere el campo: {{label}}.'
                }
                ,
                relation: [
                    {
                        action: "ENABLE",
                        when: [
                            {
                                id: "rolprincipal",
                                value: "Otro"
                            }
                        ]
                    }
                ]

            },
                {
                    element: {
                        label: "control-label"
                    },
                    grid: {
                        control: "col-sm-9",
                        label: "col-sm-3"
                    }
                }),
            new DynamicInputModel({

                id: 'Edad',
                label: '2. Edad',
                validators: {
                    required: null
                },
            })
        ]
    },
        {
            element: {
                label: 'control-label'
            },
            grid: {
                control: 'col-sm-9',
                label: 'col-sm-3'
            }
        }),
    new DynamicRadioGroupModel<string>({

        id: "rolprincipal",
        label: "3. GENERO",
        options: [
            {
                label: "Femenino",
                value: "Femenino",
            },
            {
                label: "Masculino",
                value: "Masculino"
            },
            {
                label: "Otro",
                value: "Otro"
            }
        ],
        value: "option-3",

    }),
    new DynamicSelectModel({

        id: 'ciudad',
        label: '4.	Indique la dirección de su residencia durante sus labores en la Universidad de Cuenca:<br> Ciudad: ',
        placeholder: "Escoge una ciudad",
        options: [

            {
                label: "Cuenca",
                value: "Cuenca",
            },
            {
                label: "Masculino",
                value: "Masculino"
            },
            {
                label: "Otro",
                value: "Otro"
            }
        ],
        value: null
    }),
    new DynamicSelectModel({

        id: 'parroquia',
        label: '   Parroquia: ',
        placeholder: "Escoge una ciudad",
        options: [

            {
                label: "Cuenca",
                value: "Cuenca",
            },
            {
                label: "Masculino",
                value: "Masculino"
            },
            {
                label: "Otro",
                value: "Otro"
            }
        ],
        value: null
    }),
    new DynamicInputModel({

        id: 'Calle',
        label: ' Calle',
        validators: {
            required: null
        },
    }),
    new DynamicInputModel({

        id: 'numero',
        label: ' Nro:',
        validators: {
            required: null
        },
    }),
    new DynamicInputModel({
        
                id: 'interseccion',
                label: ' Intersección:',
                validators: {
                    required: null
                },
            })
        


];