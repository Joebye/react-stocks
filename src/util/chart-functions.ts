export  function getRangedCloseData (sessionsAr: any, n: any) {
    let filteredSessions = [];
    let vals = sessionsAr.map((it: any) => it.Close || it.close);   
    const chunkSize = Math.ceil(vals.length/n);
    for (let i = 0; i<vals.length; i+=chunkSize) {
        filteredSessions.push(vals.slice(i,i+chunkSize))
    }
    return filteredSessions.map(chunk => {
        const sum = chunk.reduce((acc: any,val: any) => acc + val, 0);
        return sum/chunk.length;  

    })

}