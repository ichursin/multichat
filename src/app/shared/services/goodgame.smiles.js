/* @ngInject */
export default function GoodgameSmiles() {
    let commonSmiles = Global['Smiles'];
    let channelSmiles = [].concat.apply([], Object.keys(Global['Channel_Smiles']).map(function(key) {
        return Global['Channel_Smiles'][key];
    }));

    return [].concat(commonSmiles, channelSmiles);
}
