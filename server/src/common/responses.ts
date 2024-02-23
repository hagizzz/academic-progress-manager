interface IPaging {
    page: number
    limit: number
}

export function Response(
    code: number,
    message: string,
    data: any = undefined,
    paging: IPaging = undefined
) {
    if (paging == undefined) {
        return { code, message, data }
    }
    return { code, message, data, paging }
}

export function MessageResponse(message: string) {
    return Response(200, message)
}

export function DataResponse(data: any, paging: IPaging = undefined) {
    return Response(200, 'OK', data, paging)
}

export function NotFoundResponse(message = 'Not found') {
    return ErrorResponse(404, message)
}

export function MissingFieldResponse(message = 'Missing field') {
    return ErrorResponse(400, message)
}

export function InvalidTypeResponse(message = 'Input type is invalid') {
    return ErrorResponse(400, message)
}

export function InternalErrorResponse(message = 'Internal server error') {
    return Response(500, message)
}

export function ErrorResponse(errorCode: number, errorMessage: string) {
    return Response(errorCode, errorMessage)
}

export function UnauthorizedResponse(message = 'Unauthorized') {
    return ErrorResponse(401, message)
}
