
// import {Get, Post, Route, Body, Query, Header, Path, SuccessResponse, Controller } from 'tsoa';
import * as express from 'express';
import {Get, Route, Controller, Request, Tags, Security, Delete, Post, Body  } from 'tsoa';
import { debug, log } from 'util';
import {exampleBody, exampleBadBody} from '../model/exampleBody.model';

@Tags('Example Tag')
@Route('Example Route')
export class ExampleController extends Controller {
    /** Is this the description? 
    * @param {string} exampleParameter Example Parameter
    */
    @Get('{exampleParameter}')
    public async exampleGet(exampleParameter: string, 
        @Request() request: express.Request): Promise<string> {
        let resultList = exampleParameter + ' Modified!';
        return resultList;
    }

    /** Could this be the description? 
    * @param {exampleBody} requestBody example post body with ex1string and ex2string to set.
    */
    @Post('examplePost')
    public async examplePost(@Body() requestBody: exampleBody): Promise<string> {
        let resultList = requestBody.ex1string + ' ' + requestBody.ex2string;
        return resultList;
    }

    /** This is made to be an example of a bad call
    * @param {exampleBody} requestBody example post body with number1 and number2.
    */
   @Post('exampleBadPost')
   public async exampleBadPost(@Body() requestBody: exampleBadBody): Promise<number> {
       let resultnumber = requestBody.number1 + requestBody.number2;
       return resultnumber;
   }
}