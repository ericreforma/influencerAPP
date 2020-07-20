export const Utils = {
    compressNumber: (num) => {
        const si = [
            { value: 1, symbol: ''},
            { value: 1E3, symbol: 'K' },
            { value: 1E6, symbol: 'M' },
            { value: 1E9, symbol: 'G' },
            { value: 1E12, symbol: 'T' },
            { value: 1E15, symbol: 'P' },
            { value: 1E18, symbol: 'E' }
        ];

        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        let i;
        for (i = si.length - 1; i > 0; i--) {
            if (num >= si[i].value) {
                break;
            }
        }

        return (num / si[i].value).toFixed(1).replace(rx, '$1') + si[i].symbol;
    }
};

// For sorting arrray objects that contains id property
export const compare = (a, b) => {
    const Aid = a.id;
    const Bid = b.id;

    let comparison = 0;
    if (Aid > Bid) {
        comparison = 1;
    } else if (Aid < Bid) {
        comparison = -1;
    }
    return comparison;
}
