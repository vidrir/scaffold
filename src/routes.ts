/* tslint:disable */
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { ExampleController } from './controllers/exampleController';

const models: TsoaRoute.Models = {
    "exampleBody": {
        "properties": {
            "ex1string": { "dataType": "string", "required": true },
            "ex2string": { "dataType": "string", "required": true },
        },
    },
    "exampleBadBody": {
        "properties": {
            "number1": { "dataType": "double", "required": true },
            "number2": { "dataType": "double", "required": true },
        },
    },
};

export function RegisterRoutes(app: any) {
    app.get('/v1/Example/Route/:exampleParameter',
        function(request: any, response: any, next: any) {
            const args = {
                exampleParameter: { "in": "path", "name": "exampleParameter", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ExampleController();


            const promise = controller.exampleGet.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/v1/Example/Route/examplePost',
        function(request: any, response: any, next: any) {
            const args = {
                requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "exampleBody" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ExampleController();


            const promise = controller.examplePost.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/v1/Example/Route/exampleBadPost',
        function(request: any, response: any, next: any) {
            const args = {
                requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "exampleBadBody" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ExampleController();


            const promise = controller.exampleBadPost.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });


    function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode;
                if (controllerObj instanceof Controller) {
                    const controller = controllerObj as Controller
                    const headers = controller.getHeaders();
                    Object.keys(headers).forEach((name: string) => {
                        response.set(name, headers[name]);
                    });

                    statusCode = controller.getStatus();
                }

                if (data) {
                    response.status(statusCode || 200).json(data);
                } else {
                    response.status(statusCode || 204).end();
                }
            })
            .catch((error: any) => next(error));
    }

    function getValidatedArgs(args: any, request: any): any[] {
        const fieldErrors: FieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return ValidateParam(args[key], request.query[name], models, name, fieldErrors);
                case 'path':
                    return ValidateParam(args[key], request.params[name], models, name, fieldErrors);
                case 'header':
                    return ValidateParam(args[key], request.header(name), models, name, fieldErrors);
                case 'body':
                    return ValidateParam(args[key], request.body, models, name, fieldErrors, name + '.');
                case 'body-prop':
                    return ValidateParam(args[key], request.body[name], models, name, fieldErrors, 'body.');
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }
}
