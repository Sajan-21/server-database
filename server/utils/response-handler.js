exports.success_function = function(api_data) {
    let response = {
        success : true,
        statusCode : api_data.statusCode,
        message : api_data.message ? api_data.message : null,
        data : api_data ? api_data : null
    }
    return response;
}

exports.error_function = function(api_data) {
    let response = {
        success : false,
        statusCode : api_data.statusCode,
        message : api_data.message ? api_data.message : null,
        data : api_data ? api_data : null
    }
    return response;
}
