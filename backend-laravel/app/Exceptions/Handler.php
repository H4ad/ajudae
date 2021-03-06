<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\ErrorHandler\Error\FatalError;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $e)
    {
        $exception = $this->mapException($e);

        if ($request->wantsJson()) {   //add Accept: application/json in request
            return $this->handleApiException($request, $exception);
        } else {
            $retval = parent::render($request, $exception);
        }

        return $retval;
    }

    private function handleApiException($request, Exception $exception)
    {
        $exception = $this->prepareException($exception);

        Log::debug($exception);
        Log::debug(json_encode($exception));

        if ($exception instanceof HttpResponseException) {
            return $exception->getResponse();
        }

        if ($exception instanceof FatalError) {
            return $exception->getError();
        }

        if ($exception instanceof AuthenticationException) {
            return $this->unauthenticated($request, $exception);
        }

        if ($exception instanceof ValidationException) {
            return $this->convertValidationExceptionToResponse($exception, $request);
        }

        return $this->customApiResponse($exception);
    }

    private function customApiResponse(Exception $exception)
    {
        if (method_exists($exception, 'getStatusCode')) {
            $statusCode = $exception->getStatusCode();
        } else {
            $statusCode = 500;
        }

        $response = [];

        $response['message'] = $exception->getMessage();

        switch ($statusCode) {
            case 401:
                $response['error'] = 'Unauthorized';
                break;
            case 403:
                $response['error'] = 'Forbidden';
                break;
            case 404:
                $response['error'] = 'Not Found';
                break;
            case 405:
                $response['error'] = 'Method Not Allowed';
                break;
            case 422:
                $response['error'] = $exception->original['message'];
                $response['errors'] = $exception->original['errors'];
                break;
            default:
                $response['error'] = ($statusCode == 500) ? 'Whoops, looks like something went wrong' : $exception->getMessage();

                break;
        }

        $response['status'] = $statusCode;

        if (method_exists($exception, 'getCode')) {
            $response['code'] = $exception->getCode();
        }

        if (config('app.debug')) {
            $response['trace'] = $exception->getTrace();
        }

        return response()->json($response, $statusCode);
    }
}
