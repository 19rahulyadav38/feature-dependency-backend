const fs = require("fs");
const Feature = require("../model/feature")
const Links = require("../model/links")

const updateData3FileValues = async () => {
    let contentPath = `${process.cwd()}/src/assets/data3.json`;
    const content = fs.readFileSync(contentPath);
    let data = content.toString();
    const nodes = await Feature.find();
    const links = await Links.find();
    let finalData = {
        nodes,
        links
    };
    // console.log("finalData :", finalData.nodes)
    // let flag = false;
    // finalData.nodes.map((node) =>{
    //     // console.log("Node :- ", node)
    //     if(node.disabled == true){
    //         flag = true;
    //     }
    //     if(flag == true && node.disabled !== true){
    //         node.id = node.id - 1;
    //     }
    // })

    finalData.nodes = finalData.nodes.filter(obj => obj.disabled !== true); 
    // console.log("finalData :", finalData.nodes);

    data = JSON.stringify(finalData);

    fs.writeFile(contentPath, data, (err) => {
        if (err) throw err;
    });
    return finalData.nodes;
}
module.exports = {
    updateData3FileValues
};