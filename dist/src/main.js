"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("../http-exception.filter");
const common_1 = require("@nestjs/common");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('dosiPianoERP API')
        .setDescription('dosiPianoERP 개발을 위한 API 문서입니다')
        .setVersion('1.0')
        .addCookieAuth('connect.sid')
        .build();
    app.use((0, cookie_parser_1.default)());
    app.use((0, express_session_1.default)({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
            domain: process.env.NODE_ENV === 'production' ? '.dosipiano.com' : undefined,
        },
    }));
    app.enableCors({
        origin: [
            'http://localhost:3002',
            'https://dosipiano-g5ny7eqoz-huijungyoons-projects.vercel.app/auth/login',
            'https://dosipiano-erp.vercel.app',
            'https://erp.dosipiano.com',
            'erp.dosipiano.com',
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const port = process.env.PORT || 3000;
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
    await app.listen(port);
    console.log(`Server is running on ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map