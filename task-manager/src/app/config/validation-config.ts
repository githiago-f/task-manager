import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

export const validationPipe = () => new ValidationPipe({
    validationError: { target: true, value: true },
    whitelist: true,
    forbidUnknownValues: true,
    transform: true,
    transformOptions: {enableImplicitConversion: true},
    errorHttpStatusCode: 422,
    stopAtFirstError: true
});

export const serializationInterceptor = (reflector: Reflector) => new ClassSerializerInterceptor(
    reflector, 
    {excludePrefixes: ['_']}
);
