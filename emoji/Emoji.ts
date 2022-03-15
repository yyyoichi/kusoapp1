
export default class Emoji {
    static getXpiece(x: number) {
        const moto = Emoji.get()
        const r = moto.length % x//余り
        const puls = x - r//追加分
        const emojis = [...moto, new Array(puls).fill(" ")] as string[]
        let blocks = []
        for (let i = 0; i <emojis.length; i += x) {
            let piece = []
            for (let j = i; j < i+x; j ++) {
                piece.push(emojis[j])
            }
            blocks.push(piece)
        }
        return blocks
    }
    static get() {
        return ['😀',
            '😃',
            '😄',
            '😁',
            '😆',
            '😅',
            '😂',
            '🤣',
            '😇',
            '😉',
            '😊',
            '🙂',
            '🙃',
            '😋',
            '😌',
            '😍',
            '🥰',
            '😘',
            '😗',
            '😙',
            '😚',
            '🤪',
            '😜',
            '😝',
            '😛',
            '🤑',
            '😎',
            '🤓',
            '🧐',
            '🤠',
            '🥳',
            '🤗',
            '🤡',
            '😏',
            '😶',
            '😐',
            '😑',
            '😒',
            '🙄',
            '🤨',
            '🤔',
            '🤫',
            '🤭',
            '🤥',
            '😳',
            '😞',
            '😟',
            '😠',
            '😡',
            '🤬',
            '😔',
            '😕',
            '🙁',
            '😬',
            '🥺',
            '😣',
            '😖',
            '😫',
            '😩',
            '🥱',
            '😤',
            '😮',
            '😱',
            '😨',
            '😰',
            '😯',
            '😦',
            '😧',
            '😢',
            '😥',
            '😪',
            '🤤',
            '😓',
            '😭',
            '🤩',
            '😵',
            '🥴',
            '😲',
            '🤯',
            '🤐',
            '😷',
            '🤕',
            '🤒',
            '🤮',
            '🤢',
            '🤧',
            '🥵',
            '🥶',
            '😴']
    }
}