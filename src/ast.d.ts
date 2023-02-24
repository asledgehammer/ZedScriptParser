/* (GENERAL) */
export type Chunk = {
    body: Statement[];
};

/* (STATEMENTS) */
export type Statement =
    | ImportsStatement
    | AssignmentStatement
    | ObjectStatement;

/* (EXPRESSION) */
export type Expression =
    | Identifier
    | ModuleConstructorExpression
    | ObjectConstructor
    | RecipeConstructor
    | AssignmentExpression
    | StringArrayLiteral
    | BooleanLiteral
    | NumericLiteral
    | NumericArrayLiteral
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
    value: ObjectConstructor | RecipeConstructor;
};

export type ObjectConstructor = {
    type: 'ObjectConstructor';
    body: AssignmentStatement[];
};

/* (MATH) */
export type AssignmentOperator = '=' | ':';

export type AssignmentExpression = {
    type: 'AssignmentExpression';
    operator: AssignmentOperator;
    value: Expression;
};

export type StringArrayLiteral = {
    type: 'StringArrayLiteral';
    value: string[];
};

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
};

export type NumericArrayLiteral = {
    type: 'NumericArrayLiteral';
    value: number[];
};

/* (IDENTIFIER) */
export type Identifier = {
    type: 'Identifier';
    value: string;
};

/* (RECIPE) */
export type RecipeAction = 'destroy' | 'keep';

export type RecipeConstructor = {
    type: 'RecipeConstructor';
    sources: RecipeSourceExpression[];
    body: AssignmentStatement[];
};

export type RecipeSourceExpression = {
    type: 'RecipeSourceExpression';
    items: RecipeSourceItem[];
    action: RecipeAction;
};

export type RecipeSourceItem = {
    type: 'RecipeSourceItem',
    name: string;
    amount: number;
}
