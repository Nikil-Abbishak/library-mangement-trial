package com.library.management.dto;

import java.util.List;

public record PagedResponse<T>(
        List<T> data,
        int page,
        int limit,
        long total,
        long totalPages) {
}
