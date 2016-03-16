{
  Token.offset = offset
  Token.text = text
}

regexp      = match:match alternate:("|" regexp)? { return alternate ? new Alternate(match, alternate[1]) : match }

match       = start:start? (!quantifier) match:(quantified / submatch)* end:end? { return new Match([start].concat(match).concat([end])) }
submatch    = subexp / charset / terminal

start       = "^" { return new Token('start') }
end         = "$" { return new Token('end') }

quantified  = submatch:submatch quantifier:quantifier { return new Quantified(submatch, quantifier)}
quantifier "Quantifier" = quantity:quantifierSpec notgreedy:greedyFlag? { if (notgreedy) { quantity.greedy = false } return quantity }

quantifierSpec  = quantifierSpecFull / quantifierSpecAtLeast / quantifierSpecExact / quantifierRequired / quantifierAny / quantifierOptional
quantifierSpecFull    = "{" min:integer "," max:integer "}" { return new Quantifier(min, max)}
quantifierSpecAtLeast = "{" min:integer ",}"                { return new Quantifier(min, Infinity)}
quantifierSpecExact   = "{" value:integer "}"               { return new Quantifier(value, value)}
quantifierRequired    = "+"                                 { return new Quantifier(1, Infinity)}
quantifierAny         = "*"                                 { return new Quantifier(0, Infinity)}
quantifierOptional    = "?"                                 { return new Quantifier(0, 1)}
greedyFlag      = "?"


integer = num:([0-9]+) { return +num.join('') }


subexp = "(" body:(positiveLookahead / negativeLookahead / positiveLookbehind / negativeLookbehind / namedGroupCapture / groupNoCapture / groupCapture) ")" { return body}
groupCapture      =      regexp:regexp   { return new CaptureGroup(regexp) }
groupNoCapture    = "?:" regexp:regexp   { return new Group('non-capture-group', regexp) }
positiveLookahead = "?=" regexp:regexp   { return new Group('positive-lookahead', regexp) }
negativeLookahead = "?!" regexp:regexp   { return new Group('negative-lookahead', regexp) }
positiveLookbehind = "?<=" regexp:regexp   { return new Group('positive-lookbehind', regexp) }
negativeLookbehind = "?<!" regexp:regexp   { return new Group('negative-lookbehind', regexp) }
namedGroupCapture = namedGroupIndicator name:([A-Za-z_] [A-Za-z0-9_]*) ">" regexp:regexp   { return new CaptureGroup(regexp, name) }
namedGroupIndicator = "?P<" / "?<"

// flags (?iLmsux)
// (?(id/name)yes|no)

charset "CharacterSet" = "[" invert:"^"? body:(charClass / charsetRange / charsetTerminal)* "]" { return new CharSet(!!invert, body) }
charsetRange "CharacterRange" = start:charsetTerminal "-" end:charsetTerminal { return new CharacterRange(start, end) }
charClass "CharacterClass" = "[:" charclass:("alnum" / "alpha" / "blank" / "cntrl" / "digit" / "lower" / "upper" / "graph" / "print" / "punct" / "space" / "xdigit") ":]" { return new CharacterClass(charclass)}
charsetTerminal "Character" = charsetEscapedCharacter / charsetLiteral
charsetLiteral = value:[^\\\]] { return new Literal(value) }
charsetEscapedCharacter = backspaceCharacter / controlCharacter / digitCharacter / non_digitCharacter / formFeedCharacter / lineFeedCharacter / carriageReturnCharacter / whiteSpaceCharacter / nonWhiteSpaceCharacter / tabCharacter / verticalTabCharacter / wordCharacter / nonWordCharacter / octalCharacter / hexCharacter / unicodeCharacter / nullCharacter / otherEscaped

terminal = anyCharacter / escapedCharacter / literal

anyCharacter = "." { return new Token('any-character') }

literal "Literal" = value:[^|\\.\[\(\)\?\+\*\$\^] { return new Literal(value) }

escapedCharacter = word_boundaryCharacter /  nonWord_boundaryCharacter /  beginOfString / endOfStringBeforeNL / endOfString / matchingStartPosition / controlCharacter /  digitCharacter /  non_digitCharacter /  formFeedCharacter /  lineFeedCharacter /  carriageReturnCharacter /  whiteSpaceCharacter /  nonWhiteSpaceCharacter /  tabCharacter /  verticalTabCharacter /  wordCharacter /  nonWordCharacter /  backReference /  octalCharacter /  hexCharacter /  unicodeCharacter / unicodeCategory / nonUnicodeCategory / nullCharacter / otherEscaped

backspaceCharacter = "\\b" { return new Token('backspace') }
word_boundaryCharacter = "\\b" { return new Token('word-boundary') }

beginOfString = "\\A" { return new Token('begin-of-string') }
endOfStringBeforeNL = "\\Z" { return new Token('end-of-string-before-nl') }
endOfString = "\\z" { return new Token('end-of-string') }
matchingStartPosition = "\\G" { return new Token('match-start-position') }

nonWord_boundaryCharacter = "\\B" { return new Token('non-word-boundary') }
digitCharacter = "\\d" { return new Token('digit') }
non_digitCharacter = "\\D" { return new Token('non-digit') }
formFeedCharacter = "\\f" { return new Token('form-feed') }
lineFeedCharacter = "\\n" { return new Token('line-feed') }
carriageReturnCharacter = "\\r" { return new Token('carriage-return') }
whiteSpaceCharacter = "\\s" { return new Token('white-space') }
nonWhiteSpaceCharacter = "\\S" { return new Token('non-white-space') }
tabCharacter = "\\t" { return new Token('tab') }
verticalTabCharacter = "\\v" { return new Token('vertical-tab') }
wordCharacter = "\\w" { return new Token('word') }
nonWordCharacter = "\\W" { return new Token('non-word') }

controlCharacter = "\\c" code:. { return new ControlCharacter(code) }
backReference = "\\" code:[1-9] { return new BackReference(code) }
octalCharacter = "\\0" code:([0-7]+) { return new Octal(code.join('')) }
hexCharacter = "\\x" code:([0-9a-fA-F]+) { return new Hex(code.join('')) }
unicodeCharacter = "\\u" code:([0-9a-fA-F]+) { return new Unicode(code.join('')) }
unicodeCategory = "\\p{" code:([0-9a-zA-Z_]+) "}" { return new UnicodeCategory(code.join('')) }
nonUnicodeCategory = "\\P{" code:([0-9a-zA-Z_]+) "}" { return new UnicodeCategory(code.join(''), true) }

nullCharacter = "\\0" { return new Token('null-character') }
otherEscaped = "\\" value:. { return new Literal(value) }
