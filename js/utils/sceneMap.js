const levels = [
    [
        ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
        ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
        ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
        ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
        ['h', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'l'],
        ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
        ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
        ['f', 'f', 'f', 'f', 't', 'f', 'f', 'f', 'f', 'f'],
        ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
        ['f', 'f', 'd', 'f', 'f', 'f', 'f', 'f', 'f', 'f']
    ],
    [
        ['f', 'f', 'f', 'f', 't', 'f', 'f', 'd', 'f', 'f'],
        ['f', 'f', 'f', 'f', 't', 'f', 'f', 'f', 'f', 'f'],
        ['f', 'f', 'f', 'f', 'w', 'f', 'f', 'f', 'f', 'f'],
        ['f', 'f', 'f', 'f', 'w', 'f', 'f', 'f', 'f', 'f'],
        ['h', 'f', 'f', 'f', 'w', 'f', 'f', 'f', 'f', 'l'],
        ['f', 'f', 'f', 'f', 'w', 'f', 'f', 'f', 'f', 'f'],
        ['f', 'f', 'f', 'f', 'w', 'f', 'f', 'f', 'f', 'f'],
        ['f', 'f', 'f', 'f', 'w', 'f', 'f', 'f', 'f', 'f'],
        ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
        ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f']
    ],
    [
        ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'd', 'f', 'f'],
        ['f', 'f', 'f', 'w', 'w', 'f', 'f', 'f', 'f', 'f'],
        ['f', 'f', 'f', 'f', 'w', 'f', 'f', 'f', 'f', 'f'],
        ['f', 'f', 'f', 'f', 'w', 'f', 'f', 'f', 'f', 'f'],
        ['h', 'f', 'f', 'f', 'w', 'f', 'f', 'f', 'f', 'f'],
        ['f', 'f', 'f', 'f', 'w', 'f', 'f', 'f', 'f', 'f'],
        ['f', 'f', 'f', 'f', 'w', 'f', 'f', 'f', 'f', 'f'],
        ['f', 'f', 'f', 'f', 'w', 'f', 'f', 'f', 'f', 'f'],
        ['f', 'f', 'f', 'w', 'w', 'f', 'f', 'f', 'f', 'f'],
        ['l', 'f', 'f', 'f', 't', 'f', 'f', 'f', 'f', 'f']
    ],
    [
        ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
        ['f', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'f'],
        ['f', 'w', 'f', 'f', 'f', 'w', 'f', 'd', 'w', 'f'],
        ['f', 'w', 'f', 'w', 'f', 'f', 'f', 'w', 'w', 'f'],
        ['h', 'w', 'f', 'w', 'w', 'w', 'w', 'w', 'w', 'f'],
        ['w', 'w', 'f', 'w', 'l', 'f', 'f', 'f', 'w', 'f'],
        ['f', 'f', 'f', 'w', 'w', 'w', 'w', 'f', 'w', 'f'],
        ['f', 'w', 'f', 'f', 'f', 'f', 'f', 'f', 'w', 'f'],
        ['f', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'f'],
        ['f', 'f', 'f', 'f', 't', 'f', 'f', 'f', 'f', 'f']
    ],
    [
        ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
        ['f', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'f'],
        ['f', 'f', 'f', 'f', 'f', 'f', 'w', 'l', 'w', 'f'],
        ['f', 'w', 'w', 'w', 'w', 'f', 'w', 'f', 'w', 'f'],
        ['h', 'w', 'f', 'f', 'f', 'f', 'w', 'f', 'w', 'f'],
        ['w', 'w', 'f', 'w', 'w', 'w', 'w', 'f', 'w', 'f'],
        ['d', 'w', 'f', 'f', 'w', 'f', 'w', 'f', 'w', 'f'],
        ['f', 'w', 'w', 'f', 'f', 'f', 'f', 'f', 'w', 'f'],
        ['f', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'f'],
        ['f', 'f', 'f', 'f', 't', 'f', 'f', 'f', 'f', 'f']
    ],
    [
        ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'd'],
        ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
        ['f', 'f', 'f', 'f', 'f', 'w', 'f', 'f', 'f', 'f'],
        ['f', 'f', 'f', 'f', 'f', 'w', 'f', 'f', 'f', 'f'],
        ['f', 'f', 'w', 'h', 'f', 'w', 'f', 'f', 'f', 'f'],
        ['w', 'w', 'w', 'w', 'w', 'w', 'f', 'f', 'f', 't'],
        ['f', 'f', 'f', 'l', 'f', 'w', 'f', 'f', 't', 't'],
        ['f', 'f', 'f', 'w', 'f', 'w', 'f', 'f', 'f', 'f'],
        ['f', 'w', 'w', 'w', 'w', 'w', 't', 't', 't', 'f'],
        ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f']
    ],
    [
        ['h', 'w', 'f', 'f', 'f', 'w', 'f', 'f', 'f', 'f'],
        ['f', 'w', 'f', 'w', 'f', 'w', 'f', 'f', 'f', 'f'],
        ['f', 'w', 'f', 'w', 'f', 'w', 'f', 'f', 'f', 'f'],
        ['f', 'w', 'f', 'w', 'f', 'w', 'f', 'f', 'f', 'f'],
        ['f', 'w', 'f', 'd', 'f', 'w', 'l', 'f', 'f', 'f'],
        ['f', 'w', 'f', 'w', 'f', 'w', 'f', 'f', 'f', 'f'],
        ['f', 'w', 'f', 'w', 'f', 'w', 'f', 'f', 'f', 'f'],
        ['f', 'w', 'f', 'w', 'f', 'w', 't', 't', 'f', 'f'],
        ['f', 'w', 'f', 'w', 'f', 'w', 't', 'f', 'f', 'f'],
        ['f', 'f', 'f', 'w', 'f', 'f', 'f', '', 'f', 'f']
    ],
    [
        ['f', 'w', 'f', 'f', 'f', 'w', 'w', 'f', 'f', 'f'],
        ['f', 'f', 'f', 'w', 'f', 'f', 'f', 'f', 'f', 'f'],
        ['f', 'w', 'w', 'w', 'f', 'w', 'f', 'w', 'w', 'f'],
        ['f', 'w', 'd', 'w', 't', 'w', 'f', 'w', 'f', 'f'],
        ['f', 'w', 'f', 'w', 'f', 'w', 'f', 'w', 'f', 'w'],
        ['f', 'w', 'f', 'w', 'h', 'w', 'f', 'w', 'l', 'w'],
        ['f', 'w', 'f', 'w', 'w', 'w', 'f', 'w', 'w', 'w'],
        ['t', 'w', 'f', 'w', 'f', 't', 'f', 'f', 'f', 'f'],
        ['f', 'w', 'f', 'w', 'f', 'w', 'w', 'w', 'w', 'w'],
        ['f', 'f', 'f', 'w', 'f', 'f', 'f', 'f', 'f', 'f']
    ],
    [
        ['f', 'f', 'w', 'f', 'f', 'f', 'w', 'f', 'f', 'f'],
        ['f', 'f', 'w', 'f', 'w', 'f', 'w', 'f', 'w', 'f'],
        ['w', 'f', 'w', 'f', 'w', 'f', 'w', 'f', 'w', 'f'],
        ['w', 'f', 'f', 'f', 'w', 'f', 'w', 'f', 'w', 'f'],
        ['w', 'f', 'w', 'w', 'w', 'f', 'w', 'f', 'w', 'f'],
        ['w', 'f', 'w', 'd', 'h', 'f', 'w', 'f', 'w', 'f'],
        ['w', 'f', 'w', 'w', 'w', 'w', 'w', 'f', 'w', 'f'],
        ['w', 'f', 'f', 't', 'w', 'f', 'f', 'f', 'w', 'f'],
        ['w', 'f', 'w', 't', 'w', 'f', 'w', 'f', 'w', 'f'],
        ['w', 'f', 'w', 'f', 'f', 'f', 'w', 'f', 'w', 'l']
    ],
]
