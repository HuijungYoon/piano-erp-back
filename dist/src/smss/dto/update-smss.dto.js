"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSmssDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_smss_dto_1 = require("./create-smss.dto");
class UpdateSmssDto extends (0, mapped_types_1.PartialType)(create_smss_dto_1.CreateSmssDto) {
}
exports.UpdateSmssDto = UpdateSmssDto;
//# sourceMappingURL=update-smss.dto.js.map