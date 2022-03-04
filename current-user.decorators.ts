import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request :Express.Request= ctx.switchToHttp().getRequest();
        const user = request.user;
        console.log(user)
        return data ? user?.[data] : user;
    }
);