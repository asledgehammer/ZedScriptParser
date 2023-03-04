import {
    LexerBag,
    LexerCursor,
    LexerError,
    stepInObjectName,
    stepInOpenBracket,
} from './Lexer';

export function checkProperty(
    bag: LexerBag,
    property: string,
    categories: string[] | string,
    categoryGiven: string,
) {
    const catLower = categoryGiven.toLowerCase();
    if (typeof categories === 'string') categories = [categories];
    for (const catExp of categories) {
        const catExpLower = catExp.toLowerCase();
        if (catLower === catExpLower) {
            return;
        }
    }

    const cats = `[${categories.map((o) => o.toLowerCase()).join(', ')}]`;
    bag.error(
        `Cannot define ${property} in '${catLower}'. It is only allowed in ${cats}'.`,
    );
}
export function stepInVehicle(
    bag: LexerBag,
    module: string,
    removeWhitespace: boolean = true,
    isTemplate: boolean,
) {
    /* (Token the 'vehicle' or 'template vehicle') */
    if (isTemplate) {
        const iOffset = bag.offset - 'template vehicle'.length;
        bag.token('template vehicle', bag.cursor(iOffset), bag.cursor());
    } else {
        const iOffset = bag.offset - 'vehicle'.length;
        bag.token('vehicle', bag.cursor(iOffset), bag.cursor());
    }

    /* (Tokenize the name & opening bracket) */
    const start = bag.cursor();
    const [_, name] = bag.until(['\n', '{'], true)!!.split(' ');
    const stop = bag.cursor(bag.offset - 1);
    bag.token(name, start, stop);
    stepInOpenBracket(bag);

    /* (All named object constructors go here) */
    const space = (line: string): boolean => {
        const [cat, catName] = line.split(' ').map((o) => {
            return o.trim();
        });
        console.log({ vehicleSpaceLine: line, cat });
        switch (cat.toLowerCase()) {
            case 'part':
                stepInPart(bag, `${module}.${name}`, catName);
                return true;
        }
        return false;
    };

    /* (All non-named object constructors go here) */
    const noSpace = (line: string): boolean => {
        const lineLower = line.toLowerCase();
        console.log({ vehicleNoSpaceLine: line });
        switch (lineLower) {
        }
        return false;
    };

    while (!bag.isEOF()) {
        const start = bag.cursor();
        const line = bag.until([',', '\n', '}'])?.trim();
        const stop = bag.cursor(bag.offset - 1);

        /* (We shouldn't get here) */
        if (line == undefined) {
            bag.error(`EOF in vehicle: ${module}.${name}`);
            return;
        } else if (line === '') continue;
        /* (End of object) */ else if (line === '}') {
            bag.token('}', bag.cursor(bag.offset - 1), bag.cursor());
            break;
        }

        /* (If the line is a classic 'property = value') */
        if (line.indexOf('=') !== -1) {
            if (removeWhitespace) {
                const lineNoSpace = line.replace(/\,/g, '').replace(/\s/g, '');
                bag.token(lineNoSpace, start, stop);
            } else {
                bag.token(line.replace(/\,/g, '').trim(), start, stop);
            }
            continue;
        } else if (line === ',') continue;

        if (line.indexOf(' ') !== -1) {
            if (space(line)) continue;
        } else {
            if (noSpace(line)) continue;
        }

        bag.error(`Illegal line in '${module}.${name}': ${line}`);
        break;
    }

    function stepInPart(bag: LexerBag, parent: string, name: string) {
        /* (Token the 'vehicle' or 'template vehicle') */
        const iOffset = bag.offset - `part ${name}`.length;
        bag.token('part', bag.cursor(iOffset), bag.cursor());
        bag.token(
            name,
            bag.cursor(bag.offset - (name.length + 1)),
            bag.cursor(),
        );

        stepInOpenBracket(bag);

        /* (All named object constructors go here) */
        const space = (line: string): boolean => {
            const [cat, catName] = line.split(' ').map((o) => {
                return o.trim();
            });
            console.log({ partSpaceLine: line, cat });
            switch (cat.toLowerCase()) {
                case 'table':
                    stepInTable(bag, `${parent}.${name}`, catName);
                    return true;
            }
            return false;
        };

        /* (All non-named object constructors go here) */
        const noSpace = (line: string): boolean => {
            const cat = line.toLowerCase();
            console.log({ partNoSpaceLine: line, cat });
            switch (cat) {
                case 'lua':
                    stepInLua(bag, `${parent}.${name}`);
                    return true;
            }
            return false;
        };

        while (!bag.isEOF()) {
            const start = bag.cursor();
            const line = bag.until([',', '\n', '}'])?.trim();
            const stop = bag.cursor(bag.offset - 1);

            /* (We shouldn't get here) */
            if (line == undefined) {
                bag.error(`Unexpected EOF in '${parent}.Part[${name}]'`);
                return;
            } else if (line === '') continue;
            /* (End of object) */ else if (line === '}') {
                bag.token('}', bag.cursor(bag.offset - 1), bag.cursor());
                break;
            }

            /* (If the line is a classic 'property = value') */
            if (line.indexOf('=') !== -1) {
                if (removeWhitespace) {
                    const lineNoSpace = line
                        .replace(/\,/g, '')
                        .replace(/\s/g, '');
                    bag.token(lineNoSpace, start, stop);
                } else {
                    bag.token(line.replace(/\,/g, '').trim(), start, stop);
                }
                continue;
            } else if (line === ',') continue;

            if (line.indexOf(' ') !== -1) {
                if (space(line)) continue;
            } else {
                if (noSpace(line)) continue;
            }

            bag.error(`Illegal line in '${parent}.Part[${name}]': ${line}`);
            break;
        }
    }

    function stepInTable(bag: LexerBag, parent: string, name: string) {
        const iOffset = bag.offset - `table ${name}`.length;
        bag.token(
            'table',
            bag.cursor(iOffset),
            bag.cursor(bag.offset - ` ${name}`.length),
        );
        bag.token(
            name,
            bag.cursor(bag.offset - ` ${name}`.length),
            bag.cursor(),
        );

        /* (Tokenize the name & opening bracket) */
        stepInOpenBracket(bag);

        /* (All named object constructors go here) */
        const space = (line: string): boolean => {
            const [cat] = line.split(' ').map((o) => {
                return o.trim();
            });
            console.log({ tableSpaceLine: line, cat });
            switch (cat.toLowerCase()) {
            }
            return false;
        };

        /* (All non-named object constructors go here) */
        const noSpace = (line: string): boolean => {
            const cat = line.toLowerCase();
            console.log({ tableNoSpaceLine: line, cat });
            switch (cat) {
                case 'items':
                    stepInItems(bag, `${parent}.${name}.${line}`);
                    return true;
            }
            return false;
        };

        while (!bag.isEOF()) {
            const start = bag.cursor();
            const line = bag.until([',', '\n', '}'])?.trim();
            const stop = bag.cursor(bag.offset - 1);

            /* (We shouldn't get here) */
            if (line == undefined) {
                bag.error(`EOF in part: ${module}.${name}`);
                return;
            } else if (line === '') continue;
            /* (End of object) */ else if (line === '}') {
                bag.token('}', bag.cursor(bag.offset - 1), bag.cursor());
                break;
            }

            /* (If the line is a classic 'property = value') */
            if (line.indexOf('=') !== -1) {
                if (removeWhitespace) {
                    const lineNoSpace = line
                        .replace(/\,/g, '')
                        .replace(/\s/g, '');
                    bag.token(lineNoSpace, start, stop);
                } else {
                    bag.token(line.replace(/\,/g, '').trim(), start, stop);
                }
                continue;
            } else if (line === ',') continue;

            if (line.indexOf(' ') !== -1) {
                if (space(line)) continue;
            } else {
                if (noSpace(line)) continue;
            }

            bag.error(`Illegal line in '${parent}.${name}': ${line}`);
            break;
        }
    }

    function stepInItems(bag: LexerBag, parent: string) {
        /* (Token the 'vehicle' or 'template vehicle') */
        const iOffset = bag.offset - 'items'.length;
        bag.token('items', bag.cursor(iOffset), bag.cursor());

        /* (Tokenize the opening bracket) */
        stepInOpenBracket(bag);

        /* (All named object constructors go here) */
        const space = (line: string): boolean => {
            const [cat] = line
                .toLowerCase()
                .split(' ')
                .map((o) => {
                    return o.trim();
                });
            console.log({ itemsNoSpaceLine: line, cat });
            switch (cat) {
            }
            return false;
        };

        /* (All non-named object constructors go here) */
        const noSpace = (line: string): boolean => {
            const index = line.toLowerCase().trim();
            const start = bag.cursor(bag.offset - index.length);
            const stop = bag.cursor();

            console.log({ itemsNoSpaceLine: line, index });
            /* (Array Token) */
            bag.token(index, start, stop);
            stepInItem(bag, `${parent}.part`, index);
            return true;
        };

        while (!bag.isEOF()) {
            const start = bag.cursor();
            const line = bag.until([',', '\n', '}'])?.trim();
            const stop = bag.cursor(bag.offset - 1);

            /* (We shouldn't get here) */
            if (line == undefined) {
                bag.error(`EOF in part: ${module}.${name}`);
                return;
            } else if (line === '') continue;
            /* (End of object) */ else if (line === '}') {
                bag.token('}', bag.cursor(bag.offset - 1), bag.cursor());
                break;
            }

            /* (If the line is a classic 'property = value') */
            if (line.indexOf('=') !== -1) {
                if (removeWhitespace) {
                    const lineNoSpace = line
                        .replace(/\,/g, '')
                        .replace(/\s/g, '');
                    bag.token(lineNoSpace, start, stop);
                } else {
                    bag.token(line.replace(/\,/g, '').trim(), start, stop);
                }
                continue;
            } else if (line === ',') continue;

            if (line.indexOf(' ') !== -1) {
                if (space(line)) continue;
            } else {
                if (noSpace(line)) continue;
            }

            bag.error(`Illegal line in '${module}.${name}': ${line}`);
            break;
        }
    }

    function stepInItem(bag: LexerBag, parent: string, index: string) {
        /* (Tokenize the opening bracket) */
        stepInOpenBracket(bag);

        while (!bag.isEOF()) {
            const start = bag.cursor();
            const line = bag.until([',', '\n', '}'])?.trim();
            const stop = bag.cursor(bag.offset - 1);

            /* (We shouldn't get here) */
            if (line == undefined) {
                bag.error(`EOF in part: ${module}.${name}`);
                return;
            } else if (line === '') continue;
            /* (End of object) */ else if (line === '}') {
                bag.token('}', bag.cursor(bag.offset - 1), bag.cursor());
                break;
            }

            /* (If the line is a classic 'property = value') */
            if (line.indexOf('=') !== -1) {
                if (removeWhitespace) {
                    const lineNoSpace = line
                        .replace(/\,/g, '')
                        .replace(/\s/g, '');
                    bag.token(lineNoSpace, start, stop);
                } else {
                    bag.token(line.replace(/\,/g, '').trim(), start, stop);
                }
                continue;
            } else if (line === ',') continue;

            bag.error(`Illegal line in '${parent}[${index}]': ${line}`);
            break;
        }
    }

    function stepInLua(bag: LexerBag, parent: string) {
        const iOffset = bag.offset - 'lua'.length;
        bag.token('lua', bag.cursor(iOffset), bag.cursor());

        /* (Tokenize the name & opening bracket) */
        stepInOpenBracket(bag);

        while (!bag.isEOF()) {
            const start = bag.cursor();
            const line = bag.until([',', '\n', '}'])?.trim();
            const stop = bag.cursor(bag.offset - 1);

            /* (We shouldn't get here) */
            if (line == undefined) {
                bag.error(`Unexpected EOF in ${parent}.lua`);
                return;
            } else if (line === '') continue;
            /* (End of object) */ else if (line === '}') {
                bag.token('}', bag.cursor(bag.offset - 1), bag.cursor());
                break;
            }

            /* (If the line is a classic 'property = value') */
            if (line.indexOf('=') !== -1) {
                if (removeWhitespace) {
                    const lineNoSpace = line
                        .replace(/\,/g, '')
                        .replace(/\s/g, '');
                    bag.token(lineNoSpace, start, stop);
                } else {
                    bag.token(line.replace(/\,/g, '').trim(), start, stop);
                }
                continue;
            } else if (line === ',') continue;

            bag.error(`Illegal line in '${parent}.${name}': ${line}`);
            break;
        }
    }
}
