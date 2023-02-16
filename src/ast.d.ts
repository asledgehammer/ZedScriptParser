/* (GENERAL) */
export type Chunk = Statement[];

/* (STATEMENTS) */
export type Statement = ImportsStatement | AssignmentStatement | ObjectStatement;

/* (EXPRESSION) */
export type Expression =
    | Identifier
    | ModuleConstructorExpression
    | ObjectConstructorExpression
    | AssignmentExpression
    | RecipeItemsExpression
    | BooleanLiteral
    | NumericLiteral
    | StringLiteral
    | NullLiteral;

/* (ASSIGNMENT) */
export type AssignmentStatement = {
    type: 'AssignmentStatement';
    id: Identifier;
    value: Expression;
};

/* (MODULE) */
export type ImportsStatement = {
    type: 'ImportStatement';
    value: Identifier[];
};

export type ModuleConstructorExpression = {
    type: 'ModuleConstructorExpression';
    body: (ImportsStatement | ObjectStatement)[];
};

/* (OBJECT) */
export type ObjectStatement = {
    type: 'ObjectStatement';
    id: Identifier;
    category: Identifier;
    value: ObjectConstructorExpression;
};

export type ObjectConstructorExpression = {
    type: 'ObjectConstructorExpression';
    body: AssignmentStatement[];
};

/* (MATH) */
export type AssignmentOperator = '=' | ':';

export type AssignmentExpression = {
    type: 'AssignmentExpression';
    operator: AssignmentOperator;
    value: Expression;
};

export type RecipeItemsExpression = {
    type: 'RecipeItemsExpression';
    values: string[];
}

/* (LITERAL) */
export type BooleanLiteral = {
    type: 'BooleanLiteral';
    value: boolean;
};

export type NumericLiteral = {
    type: 'NumericLiteral';
    value: number;
};

export type StringLiteral = {
    type: 'StringLiteral';
    value: string;
};

export type NullLiteral = {
    type: 'NullLiteral';
}

export type NumericArrayLiteral = {
    type: 'NumericArrayLiteral',
    values: number[];
};

/* (IDENTIFIER) */
export type Identifier = {
    type: 'Identifier';
    value: string;
};
