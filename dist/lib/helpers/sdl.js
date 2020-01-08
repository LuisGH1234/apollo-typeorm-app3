"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
exports.sdlTool = {
    import: (...paths) => {
        const file = fs.readFileSync(path.join(...paths));
        return apollo_server_express_1.gql(file.toString());
    }
};
//# sourceMappingURL=sdl.js.map