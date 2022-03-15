
export default class Emoji {
    private emo = ['😀',
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
    getXpiece(x: number) {
        const moto = this.emo
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
    get() {
        return this.emo
    }
    getIndexOf(emoji: string) {
        return this.emo.indexOf(emoji)
    }
    getAt(index: number | string) {
        return this.emo[Number(index)]
    }
}