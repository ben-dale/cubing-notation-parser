# Cubing Notation Parser

A Javascript library for parsing cubing notation into an easy to process format.

## Example:

```
var algorithm = "(UR)2 RU U2";
CubingNotationParser.parse(algorithm);
```
The result of which would be:
```
[{
    algorithm: ['UR'],
    repeat: '2'
}, {
    algorithm: ['RU'],
    repeat: 1
}, {
    algorithm: ['U'],
    repeat: '2'
}]
```

Don't expect the parser to produce sane results for invalid notations.

### Valid notations:
- (UR)2 RU U2
- U2 R2 L2 F

### Invalid notations:
- UR 2 4 LL2
- LL 44 33 L2
