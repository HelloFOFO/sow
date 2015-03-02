/**
 * Created by zhisongli on 14-9-29.
 */
function sleep(sleepTime) {
    for(var start = Date.now(); Date.now() - start <= sleepTime; ) { }
}