package utils

import (
	"time"

	"google.golang.org/protobuf/types/known/timestamppb"
)

const (
	safaricomTimeLayout = "2006-01-02T15:04:05Z07:00"
	timeLayout  = "2006-01-02T15:04:05Z07:00"
	dateLayout  = "2006-01-02"
)

func ParseTime(
	timeString string,
) (time.Time) {

	parsedTime, err := time.ParseInLocation(timeLayout, timeString, time.UTC)
	if err != nil {
		return time.Time{}
	}

	return parsedTime
}

func FormatDate(timeToFormat time.Time) string {
	return timeToFormat.In(time.UTC).Format(dateLayout)
}

func FormatTime(
	timeToFormat time.Time,
) string {
	return timeToFormat.In(time.UTC).Format(timeLayout)
}

func FormatDateTime(
	timeToFormat time.Time,
) string {
	return timeToFormat.In(time.UTC).Format(safaricomTimeLayout)
}

func ConvertToProtobufTime(time time.Time) *timestamppb.Timestamp {
	return timestamppb.New(time)
}