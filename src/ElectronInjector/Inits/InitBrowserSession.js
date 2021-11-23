import {session} from "electron";

export default function () {

    return session.fromPartition('persist:name');
}
