/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MatchWith = exports.configureSwagger = exports.validateConfig = exports.rawBodyMiddleware = void 0;
var raw_body_middleware_1 = __webpack_require__(3);
Object.defineProperty(exports, "rawBodyMiddleware", ({ enumerable: true, get: function () { return raw_body_middleware_1.rawBodyMiddleware; } }));
var validate_config_1 = __webpack_require__(5);
Object.defineProperty(exports, "validateConfig", ({ enumerable: true, get: function () { return validate_config_1.validateConfig; } }));
var configure_swagger_1 = __webpack_require__(8);
Object.defineProperty(exports, "configureSwagger", ({ enumerable: true, get: function () { return configure_swagger_1.configureSwagger; } }));
var match_with_decorator_1 = __webpack_require__(10);
Object.defineProperty(exports, "MatchWith", ({ enumerable: true, get: function () { return match_with_decorator_1.MatchWith; } }));


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.rawBodyMiddleware = void 0;
const body_parser_1 = __webpack_require__(4);
function rawBodyMiddleware() {
    return (0, body_parser_1.json)({
        verify: (req, res, buf) => {
            if (req.url === '/api/stripe/webhook' && Buffer.isBuffer(buf)) {
                req.rawBody = Buffer.from(buf);
            }
            return true;
        },
    });
}
exports.rawBodyMiddleware = rawBodyMiddleware;


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateConfig = void 0;
const class_transformer_1 = __webpack_require__(6);
const class_validator_1 = __webpack_require__(7);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateConfig(Expected) {
    return (config = {}) => {
        const validatedConf = (0, class_transformer_1.plainToInstance)(Expected, config, {
            exposeDefaultValues: true,
        });
        const errors = (0, class_validator_1.validateSync)(validatedConf);
        if (errors.length)
            throw new Error(errors.toString());
        return validatedConf;
    };
}
exports.validateConfig = validateConfig;


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.configureSwagger = void 0;
const swagger_1 = __webpack_require__(9);
function configureSwagger(app, { swaggerPrefix = 'doc', }) {
    const swaggerDoc = swagger_1.SwaggerModule.createDocument(app, new swagger_1.DocumentBuilder()
        .setTitle('Board API')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'headers',
        name: 'Authorization',
    })
        .setDescription(`
* _Last update: ${new Date().toLocaleString()}_
`)
        .setVersion('0.0.1')
        .build());
    swagger_1.SwaggerModule.setup(swaggerPrefix, app, swaggerDoc, {
        useGlobalPrefix: false,
        swaggerOptions: {
            persistAuthorization: true,
            tryItOutEnabled: true,
            filter: true,
        },
        explorer: false,
    });
}
exports.configureSwagger = configureSwagger;


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MatchWith = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(7);
function MatchWith(property, validationOptions = {}) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (object, propertyName) => {
        validationOptions.message = validationOptions.message
            ? validationOptions.message
            : `${propertyName} should match with ${property.toString()}`;
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: MatchConstraint,
        });
    };
}
exports.MatchWith = MatchWith;
let MatchConstraint = class MatchConstraint {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validate(value, args) {
        const [relatedPropertyName] = args.constraints;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const relatedValue = args.object[relatedPropertyName];
        return value === relatedValue;
    }
};
MatchConstraint = tslib_1.__decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'MatchWith' })
], MatchConstraint);


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(1);
const shared_1 = __webpack_require__(15);
const common_1 = __webpack_require__(11);
const board_module_1 = __webpack_require__(28);
const card_module_1 = __webpack_require__(31);
const category_module_1 = __webpack_require__(33);
const boards_controller_1 = __webpack_require__(34);
const card_controller_1 = __webpack_require__(44);
const category_controller_1 = __webpack_require__(45);
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [shared_1.SharedModule, board_module_1.BoardModule, category_module_1.CategoryModule, card_module_1.CardModule],
        controllers: [boards_controller_1.BoardsController, card_controller_1.CardController, category_controller_1.CategoryController],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(16), exports);
tslib_1.__exportStar(__webpack_require__(24), exports);
tslib_1.__exportStar(__webpack_require__(26), exports);


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedModule = void 0;
const tslib_1 = __webpack_require__(1);
const configuration_1 = __webpack_require__(17);
const prisma_1 = __webpack_require__(20);
const common_1 = __webpack_require__(11);
let SharedModule = class SharedModule {
};
SharedModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [configuration_1.ConfigurationModule, prisma_1.PrismaModule],
        exports: [configuration_1.ConfigurationModule, prisma_1.PrismaModule],
    })
], SharedModule);
exports.SharedModule = SharedModule;


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FullConfig = void 0;
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(18), exports);
var full_config_1 = __webpack_require__(19);
Object.defineProperty(exports, "FullConfig", ({ enumerable: true, get: function () { return full_config_1.FullConfig; } }));


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigurationModule = void 0;
const tslib_1 = __webpack_require__(1);
const utils_1 = __webpack_require__(2);
const common_1 = __webpack_require__(11);
const config_1 = __webpack_require__(12);
const full_config_1 = __webpack_require__(19);
let ConfigurationModule = class ConfigurationModule {
};
ConfigurationModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validate: (0, utils_1.validateConfig)(full_config_1.FullConfig),
                envFilePath: '.development.env',
            }),
        ],
    })
], ConfigurationModule);
exports.ConfigurationModule = ConfigurationModule;


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FullConfig = void 0;
const tslib_1 = __webpack_require__(1);
const class_transformer_1 = __webpack_require__(6);
const class_validator_1 = __webpack_require__(7);
class FullConfig {
    constructor() {
        /**
         * This timezone
         * (often you should difference between code and db)
         * this is simple solution how configure it on your side
         */
        this.TZ = 'GMT';
    }
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], FullConfig.prototype, "RUN_MODE", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", Object)
], FullConfig.prototype, "TZ", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Transform)(({ value }) => +value),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(3000),
    (0, class_validator_1.Max)(9999),
    tslib_1.__metadata("design:type", Number)
], FullConfig.prototype, "API_PORT", void 0);
exports.FullConfig = FullConfig;


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(21), exports);
tslib_1.__exportStar(__webpack_require__(22), exports);


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(11);
const prisma_service_1 = __webpack_require__(22);
let PrismaModule = class PrismaModule {
};
PrismaModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
    })
], PrismaModule);
exports.PrismaModule = PrismaModule;


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(11);
const client_1 = __webpack_require__(23);
let PrismaService = class PrismaService extends client_1.PrismaClient {
    onModuleInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.$connect();
        });
    }
};
PrismaService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], PrismaService);
exports.PrismaService = PrismaService;


/***/ }),
/* 23 */
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccessComposition = void 0;
var access_composition_decorator_1 = __webpack_require__(25);
Object.defineProperty(exports, "AccessComposition", ({ enumerable: true, get: function () { return access_composition_decorator_1.AccessComposition; } }));


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccessComposition = void 0;
const common_1 = __webpack_require__(11);
const swagger_1 = __webpack_require__(9);
const AccessComposition = () => (0, common_1.applyDecorators)((0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid token' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Email not verified' }));
exports.AccessComposition = AccessComposition;


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaErrorHelper = void 0;
var prisma_error_helper_1 = __webpack_require__(27);
Object.defineProperty(exports, "PrismaErrorHelper", ({ enumerable: true, get: function () { return prisma_error_helper_1.PrismaErrorHelper; } }));


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaErrorHelper = void 0;
const common_1 = __webpack_require__(11);
const client_1 = __webpack_require__(23);
const PrismaErrorHelper = (e) => {
    var _a, _b;
    if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        throw new common_1.InternalServerErrorException((_b = (_a = e.meta) === null || _a === void 0 ? void 0 : _a['cause']) !== null && _b !== void 0 ? _b : undefined);
    }
    throw e;
};
exports.PrismaErrorHelper = PrismaErrorHelper;


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BoardModule = void 0;
const tslib_1 = __webpack_require__(1);
const prisma_1 = __webpack_require__(20);
const common_1 = __webpack_require__(11);
const board_service_1 = __webpack_require__(29);
const category_service_1 = __webpack_require__(30);
let BoardModule = class BoardModule {
};
BoardModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [prisma_1.PrismaService, board_service_1.BoardService, category_service_1.CategoryService],
        exports: [board_service_1.BoardService],
    })
], BoardModule);
exports.BoardModule = BoardModule;


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BoardService = void 0;
const tslib_1 = __webpack_require__(1);
const prisma_1 = __webpack_require__(20);
const shared_1 = __webpack_require__(15);
const common_1 = __webpack_require__(11);
const category_service_1 = __webpack_require__(30);
let BoardService = class BoardService {
    constructor(prisma, categoryService) {
        this.prisma = prisma;
        this.categoryService = categoryService;
    }
    create(board) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const categoryNames = ['To do', 'In progress', 'Done'];
            const result = yield this.prisma.board.create({ data: board });
            yield this.categoryService.create(categoryNames, result.id);
            return result;
        });
    }
    getById(board) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.prisma.board.findUnique({
                where: board,
                select: {
                    name: true,
                    id: true,
                    categories: {
                        select: {
                            name: true,
                            id: true,
                            cards: {
                                select: {
                                    description: true,
                                    title: true,
                                    id: true,
                                    order: true,
                                    categoryId: true,
                                },
                                orderBy: { order: 'asc' }
                            },
                        },
                    },
                },
            });
            if (!result) {
                throw new common_1.NotFoundException('Board with such id does not exists');
            }
            return result;
        });
    }
    deleteById(board) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.prisma.board.delete({ where: board });
                return res;
            }
            catch (e) {
                (0, shared_1.PrismaErrorHelper)(e);
            }
        });
    }
};
BoardService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [prisma_1.PrismaService,
        category_service_1.CategoryService])
], BoardService);
exports.BoardService = BoardService;


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryService = void 0;
const tslib_1 = __webpack_require__(1);
const prisma_1 = __webpack_require__(20);
const shared_1 = __webpack_require__(15);
const common_1 = __webpack_require__(11);
let CategoryService = class CategoryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(names, boardId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.prisma.categories.createMany({
                    data: names.map((el) => ({ name: el, boardId })),
                });
            }
            catch (err) {
                (0, shared_1.PrismaErrorHelper)(err);
            }
        });
    }
    getCategoriesByBoardId(boardId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.categories.findMany({
                where: { boardId },
                select: {
                    name: true,
                    id: true,
                    cards: {
                        select: {
                            description: true,
                            title: true,
                            id: true,
                            order: true,
                            categoryId: true,
                        },
                    },
                },
            });
        });
    }
};
CategoryService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [prisma_1.PrismaService])
], CategoryService);
exports.CategoryService = CategoryService;


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CardModule = void 0;
const tslib_1 = __webpack_require__(1);
const prisma_1 = __webpack_require__(20);
const common_1 = __webpack_require__(11);
const card_service_1 = __webpack_require__(32);
let CardModule = class CardModule {
};
CardModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [prisma_1.PrismaService, card_service_1.CardService],
        exports: [card_service_1.CardService],
    })
], CardModule);
exports.CardModule = CardModule;


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CardService = void 0;
const tslib_1 = __webpack_require__(1);
const prisma_1 = __webpack_require__(20);
const shared_1 = __webpack_require__(15);
const common_1 = __webpack_require__(11);
let CardService = class CardService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(card) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const cards = yield this.getMany(card.categoryId);
                return this.prisma.cards.create({
                    data: Object.assign(Object.assign({}, card), { order: cards.length + 1, categoryId: card.categoryId }),
                });
            }
            catch (err) {
                (0, shared_1.PrismaErrorHelper)(err);
            }
        });
    }
    getMany(categoryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.cards.findMany({
                where: { categoryId },
            });
        });
    }
    delete(cardId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.prisma.$transaction((tx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const cardToDelete = yield tx.cards.findUnique({
                        where: { id: cardId },
                        select: { categoryId: true, order: true },
                    });
                    yield tx.cards.delete({ where: { id: cardId } });
                    const categoriesToUpdateOrder = yield tx.cards.findMany({
                        where: {
                            order: { gte: cardToDelete.order },
                            categoryId: cardToDelete.categoryId,
                        },
                        select: { order: true, id: true },
                    });
                    yield Promise.all(categoriesToUpdateOrder.map((el) => tx.cards.update({
                        where: { id: el.id },
                        data: { order: el.order - 1 },
                    })));
                }));
            }
            catch (err) {
                (0, shared_1.PrismaErrorHelper)(err);
            }
        });
    }
    updateOrder(body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const [cardsInCategory, reorderedCard] = yield Promise.all([
                    this.prisma.cards.findMany({
                        where: { categoryId: body.categoryId },
                        orderBy: { order: 'asc' },
                    }),
                    this.prisma.cards.findUnique({
                        where: { id: body.cardId },
                    }),
                ]);
                if (!reorderedCard) {
                    throw new common_1.NotFoundException();
                }
                if (body.order > cardsInCategory.length - 1) {
                    throw new common_1.BadRequestException(`Choose another position. Max value is ${cardsInCategory.length}`);
                }
                const targetCard = cardsInCategory[body.order];
                //Index of card to move
                const targetCardIndex = cardsInCategory.findIndex((el) => el.id === (targetCard === null || targetCard === void 0 ? void 0 : targetCard.id));
                //Index of card we drag
                const draggableCardIndex = cardsInCategory.findIndex((el) => el.id == reorderedCard.id);
                yield this.prisma.$transaction((tx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    let items = cardsInCategory;
                    //If same column - change order, if different - create item for one col and delete it from another
                    if (reorderedCard.categoryId === body.categoryId) {
                        items.splice(draggableCardIndex, 1);
                        items.splice(targetCard !== undefined ? targetCardIndex : cardsInCategory.length, 0, reorderedCard);
                        items = items.map((el, index) => (Object.assign(Object.assign({}, el), { order: index + 1 })));
                    }
                    else {
                        //Remove from prev column
                        yield tx.cards.delete({ where: { id: reorderedCard.id } });
                        items = yield tx.cards.findMany({
                            where: {
                                order: { gte: reorderedCard.order },
                                categoryId: reorderedCard.categoryId,
                            },
                        });
                        items = items.map((el) => (Object.assign(Object.assign({}, el), { order: el.order - 1 })));
                    }
                    yield Promise.all(items.map((el) => tx.cards.update({
                        where: { id: el.id },
                        data: { order: el.order },
                    })));
                    if (reorderedCard.categoryId != body.categoryId) {
                        //Add to new column
                        const newItems = cardsInCategory;
                        newItems.splice(targetCard !== undefined ? targetCardIndex : cardsInCategory.length, 0, reorderedCard);
                        yield Promise.all(newItems.map((el, index) => {
                            return tx.cards.upsert({
                                where: { id: el.id },
                                create: Object.assign(Object.assign({}, reorderedCard), { categoryId: body.categoryId, order: index + 1 }),
                                update: { order: index + 1, categoryId: body.categoryId },
                            });
                        }));
                    }
                }));
            }
            catch (err) {
                (0, shared_1.PrismaErrorHelper)(err);
            }
        });
    }
    update(body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = body, payload = tslib_1.__rest(body, ["id"]);
                const res = yield this.prisma.cards.update({
                    where: { id },
                    data: payload,
                });
                return res;
            }
            catch (err) {
                (0, shared_1.PrismaErrorHelper)(err);
            }
        });
    }
};
CardService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [prisma_1.PrismaService])
], CardService);
exports.CardService = CardService;


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryModule = void 0;
const tslib_1 = __webpack_require__(1);
const prisma_1 = __webpack_require__(20);
const common_1 = __webpack_require__(11);
const category_service_1 = __webpack_require__(30);
let CategoryModule = class CategoryModule {
};
CategoryModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [prisma_1.PrismaService, category_service_1.CategoryService],
        exports: [category_service_1.CategoryService],
    })
], CategoryModule);
exports.CategoryModule = CategoryModule;


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BoardsController = void 0;
const tslib_1 = __webpack_require__(1);
const openapi = __webpack_require__(9);
const dto_1 = __webpack_require__(35);
const common_1 = __webpack_require__(11);
const swagger_1 = __webpack_require__(9);
const board_service_1 = __webpack_require__(29);
let BoardsController = class BoardsController {
    constructor(boardService) {
        this.boardService = boardService;
    }
    getById(id) {
        return this.boardService.getById({ id });
    }
    create(body) {
        return this.boardService.create(body);
    }
    delete(id) {
        return this.boardService.deleteById({ id });
    }
};
tslib_1.__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get board by id' }),
    (0, common_1.Get)('/:id'),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(41).BoardByIdRes) }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], BoardsController.prototype, "getById", null);
tslib_1.__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create board' }),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: (__webpack_require__(37).FullBoardDto) }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [dto_1.CreateBoardReq]),
    tslib_1.__metadata("design:returntype", Promise)
], BoardsController.prototype, "create", null);
tslib_1.__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete board' }),
    (0, common_1.Delete)('/:id'),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(37).FullBoardDto) }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], BoardsController.prototype, "delete", null);
BoardsController = tslib_1.__decorate([
    (0, common_1.Controller)('board'),
    (0, swagger_1.ApiTags)('board'),
    tslib_1.__metadata("design:paramtypes", [board_service_1.BoardService])
], BoardsController);
exports.BoardsController = BoardsController;


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(36), exports);
tslib_1.__exportStar(__webpack_require__(40), exports);


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FullCategoryDto = exports.FullCardDto = exports.FullBoardDto = void 0;
var board_dto_1 = __webpack_require__(37);
Object.defineProperty(exports, "FullBoardDto", ({ enumerable: true, get: function () { return board_dto_1.FullBoardDto; } }));
var card_dto_1 = __webpack_require__(38);
Object.defineProperty(exports, "FullCardDto", ({ enumerable: true, get: function () { return card_dto_1.FullCardDto; } }));
var category_dto_1 = __webpack_require__(39);
Object.defineProperty(exports, "FullCategoryDto", ({ enumerable: true, get: function () { return category_dto_1.FullCategoryDto; } }));


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FullBoardDto = void 0;
const tslib_1 = __webpack_require__(1);
const openapi = __webpack_require__(9);
const class_validator_1 = __webpack_require__(7);
class FullBoardDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String, maxLength: 30 } };
    }
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FullBoardDto.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FullBoardDto.prototype, "name", void 0);
exports.FullBoardDto = FullBoardDto;


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FullCardDto = void 0;
const tslib_1 = __webpack_require__(1);
const openapi = __webpack_require__(9);
const class_validator_1 = __webpack_require__(7);
class FullCardDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, title: { required: true, type: () => String }, description: { required: true, type: () => String }, order: { required: true, type: () => Number, minimum: 1 }, categoryId: { required: true, type: () => String } };
    }
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FullCardDto.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], FullCardDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], FullCardDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    tslib_1.__metadata("design:type", Number)
], FullCardDto.prototype, "order", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], FullCardDto.prototype, "categoryId", void 0);
exports.FullCardDto = FullCardDto;


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FullCategoryDto = void 0;
const tslib_1 = __webpack_require__(1);
const openapi = __webpack_require__(9);
const class_validator_1 = __webpack_require__(7);
class FullCategoryDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String, maxLength: 30 }, boardId: { required: true, type: () => String } };
    }
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FullCategoryDto.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(30),
    tslib_1.__metadata("design:type", String)
], FullCategoryDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FullCategoryDto.prototype, "boardId", void 0);
exports.FullCategoryDto = FullCategoryDto;


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCardReq = exports.CreateBoardReq = exports.CategoriesRes = exports.CreateCardReq = exports.UpdateCardsOrderReq = exports.BoardByIdRes = void 0;
var board_dto_1 = __webpack_require__(41);
Object.defineProperty(exports, "BoardByIdRes", ({ enumerable: true, get: function () { return board_dto_1.BoardByIdRes; } }));
var card_dto_1 = __webpack_require__(42);
Object.defineProperty(exports, "UpdateCardsOrderReq", ({ enumerable: true, get: function () { return card_dto_1.UpdateCardsOrderReq; } }));
var card_dto_2 = __webpack_require__(42);
Object.defineProperty(exports, "CreateCardReq", ({ enumerable: true, get: function () { return card_dto_2.CreateCardReq; } }));
var categories_dto_1 = __webpack_require__(43);
Object.defineProperty(exports, "CategoriesRes", ({ enumerable: true, get: function () { return categories_dto_1.CategoriesRes; } }));
var board_dto_2 = __webpack_require__(41);
Object.defineProperty(exports, "CreateBoardReq", ({ enumerable: true, get: function () { return board_dto_2.CreateBoardReq; } }));
var card_dto_3 = __webpack_require__(42);
Object.defineProperty(exports, "UpdateCardReq", ({ enumerable: true, get: function () { return card_dto_3.UpdateCardReq; } }));


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BoardByIdRes = exports.CreateBoardReq = void 0;
const openapi = __webpack_require__(9);
const swagger_1 = __webpack_require__(9);
const common_1 = __webpack_require__(36);
class CreateBoardReq extends (0, swagger_1.IntersectionType)((0, swagger_1.PickType)(common_1.FullBoardDto, ['name'])) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.CreateBoardReq = CreateBoardReq;
class BoardCategoriesRes extends (0, swagger_1.IntersectionType)((0, swagger_1.PickType)(common_1.FullBoardDto, ['name', 'id'])) {
    static _OPENAPI_METADATA_FACTORY() {
        return { cards: { required: true, type: () => [(__webpack_require__(38).FullCardDto)] } };
    }
}
class BoardByIdRes extends (0, swagger_1.IntersectionType)((0, swagger_1.PickType)(common_1.FullBoardDto, ['name', 'id'])) {
    static _OPENAPI_METADATA_FACTORY() {
        return { categories: { required: true, type: () => [BoardCategoriesRes] } };
    }
}
exports.BoardByIdRes = BoardByIdRes;


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCardsOrderReq = exports.UpdateCardReq = exports.CreateCardReq = void 0;
const tslib_1 = __webpack_require__(1);
const openapi = __webpack_require__(9);
const swagger_1 = __webpack_require__(9);
const class_validator_1 = __webpack_require__(7);
const common_1 = __webpack_require__(36);
class CreateCardReq extends (0, swagger_1.IntersectionType)((0, swagger_1.PickType)(common_1.FullCardDto, ['title', 'description', 'categoryId'])) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.CreateCardReq = CreateCardReq;
class UpdateCardReq extends (0, swagger_1.IntersectionType)((0, swagger_1.PickType)(common_1.FullCardDto, ['id']), (0, swagger_1.PartialType)((0, swagger_1.PickType)(common_1.FullCardDto, ['title', 'description']))) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateCardReq = UpdateCardReq;
class UpdateCardsOrderReq {
    static _OPENAPI_METADATA_FACTORY() {
        return { cardId: { required: true, type: () => String }, categoryId: { required: true, type: () => String }, order: { required: false, type: () => Number, nullable: true } };
    }
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateCardsOrderReq.prototype, "cardId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateCardsOrderReq.prototype, "categoryId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], UpdateCardsOrderReq.prototype, "order", void 0);
exports.UpdateCardsOrderReq = UpdateCardsOrderReq;


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesRes = void 0;
const openapi = __webpack_require__(9);
const swagger_1 = __webpack_require__(9);
const common_1 = __webpack_require__(36);
class CategoriesRes extends (0, swagger_1.IntersectionType)((0, swagger_1.PickType)(common_1.FullCategoryDto, ['name', 'id'])) {
    static _OPENAPI_METADATA_FACTORY() {
        return { cards: { required: true, type: () => [(__webpack_require__(38).FullCardDto)] } };
    }
}
exports.CategoriesRes = CategoriesRes;


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CardController = void 0;
const tslib_1 = __webpack_require__(1);
const openapi = __webpack_require__(9);
const dto_1 = __webpack_require__(35);
const common_1 = __webpack_require__(11);
const swagger_1 = __webpack_require__(9);
const card_service_1 = __webpack_require__(32);
let CardController = class CardController {
    constructor(cardService) {
        this.cardService = cardService;
    }
    updateOrder(body) {
        return this.cardService.updateOrder(body);
    }
    update(body) {
        return this.cardService.update(body);
    }
    create(body) {
        return this.cardService.create(body);
    }
    delete(id) {
        return this.cardService.delete(id);
    }
};
tslib_1.__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update card order' }),
    (0, common_1.Patch)('order'),
    openapi.ApiResponse({ status: 200 }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [dto_1.UpdateCardsOrderReq]),
    tslib_1.__metadata("design:returntype", Promise)
], CardController.prototype, "updateOrder", null);
tslib_1.__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update card' }),
    (0, common_1.Patch)(),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(38).FullCardDto) }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [dto_1.UpdateCardReq]),
    tslib_1.__metadata("design:returntype", Promise)
], CardController.prototype, "update", null);
tslib_1.__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create card' }),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: (__webpack_require__(38).FullCardDto) }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [dto_1.CreateCardReq]),
    tslib_1.__metadata("design:returntype", Promise)
], CardController.prototype, "create", null);
tslib_1.__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete card' }),
    (0, common_1.Delete)('/:id'),
    openapi.ApiResponse({ status: 200 }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], CardController.prototype, "delete", null);
CardController = tslib_1.__decorate([
    (0, common_1.Controller)('card'),
    (0, swagger_1.ApiTags)('card'),
    tslib_1.__metadata("design:paramtypes", [card_service_1.CardService])
], CardController);
exports.CardController = CardController;


/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryController = void 0;
const tslib_1 = __webpack_require__(1);
const openapi = __webpack_require__(9);
const common_1 = __webpack_require__(11);
const swagger_1 = __webpack_require__(9);
const category_service_1 = __webpack_require__(30);
let CategoryController = class CategoryController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    getById(boardId) {
        return this.categoriesService.getCategoriesByBoardId(boardId);
    }
};
tslib_1.__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get categories by board id' }),
    (0, common_1.Get)('/:boardId'),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(43).CategoriesRes)] }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "getById", null);
CategoryController = tslib_1.__decorate([
    (0, common_1.Controller)('category'),
    (0, swagger_1.ApiTags)('category'),
    tslib_1.__metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
exports.CategoryController = CategoryController;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const utils_1 = __webpack_require__(2);
const common_1 = __webpack_require__(11);
const config_1 = __webpack_require__(12);
const core_1 = __webpack_require__(13);
const app_module_1 = __webpack_require__(14);
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors({ origin: '*' });
        app.use((0, utils_1.rawBodyMiddleware)());
        const configService = app.get((config_1.ConfigService));
        const globalPrefix = 'api';
        const swaggerPrefix = 'doc';
        app.setGlobalPrefix(globalPrefix);
        const PORT = configService.get('API_PORT');
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            skipMissingProperties: false,
            skipNullProperties: false,
            stopAtFirstError: true,
            transformOptions: {
                exposeDefaultValues: true,
                enableImplicitConversion: false,
            },
            exceptionFactory: (errors) => {
                function richFirstErrorMessage(errors) {
                    const topLevelErrors = errors[0].constraints;
                    if (topLevelErrors) {
                        return Object.values(topLevelErrors)[0];
                    }
                    return richFirstErrorMessage(errors[0].children);
                }
                return new common_1.BadRequestException(richFirstErrorMessage(errors));
            },
        }));
        (0, utils_1.configureSwagger)(app, { swaggerPrefix });
        yield app.listen(PORT);
        const url = yield app.getUrl();
        common_1.Logger.log(`📚 Swagger documentation: ${url}/${swaggerPrefix}`);
        common_1.Logger.log(`🚀 Application is running on: ${url}/${globalPrefix}`);
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map