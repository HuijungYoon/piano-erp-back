"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMacroDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const Macros_1 = require("../../entities/Macros");
class CreateMacroDto extends (0, mapped_types_1.PickType)(Macros_1.Macros, [
    'id',
    'name',
    'format',
]) {
}
exports.CreateMacroDto = CreateMacroDto;
//# sourceMappingURL=create-macro.dto.js.map