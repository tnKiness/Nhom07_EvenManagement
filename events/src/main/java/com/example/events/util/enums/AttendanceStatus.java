package com.example.events.util.enums;

public enum AttendanceStatus {
    REGISTERED("REGISTERED"),
    ATTENDED("ATTENDED"),
    CANCELLED("CANCELLED");

    private final String value;

    AttendanceStatus(String value) {
        this.value = value;
    }

    public static AttendanceStatus fromValue(String value) {
        for (AttendanceStatus status : values()) {
            if (status.value.equals(value)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Invalid attendance status value: " + value);
    }

    public String toValue() {
        return value;
    }
}
