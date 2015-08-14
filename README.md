# Cubing Notation Parser

A Javascript library for parsing cubing notation into an easy to process format.

## Example:

```
var algorithm = "(UR)2 RU (U)2";
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
