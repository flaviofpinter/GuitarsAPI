package dev.pinter.guitarinfo.entity;

import org.jdbi.v3.core.mapper.reflect.ColumnName;

public record Guitar(
        @ColumnName("brand") String brand,
        @ColumnName("model") String model,
        @ColumnName("launchYear") String launchYear,
        @ColumnName("mostFamousUser") String mostFamousUser,
        @ColumnName("primaryColor") String primaryColor,
        @ColumnName("colorOrFinish") String colorOrFinish,
        @ColumnName("guitarType") String guitarType,
        @ColumnName("countryOfOrigin") String countryOfOrigin,
        @ColumnName("pickupConfiguration") String pickupConfiguration,
        @ColumnName("bodyWood") String bodyWood,
        @ColumnName("neckConstruction") String neckConstruction,
        @ColumnName("status") String status) {
    @Override
    public String toString() {
        return "Guitar{" +
                "brand='" + brand + '\'' +
                ", model='" + model + '\'' +
                ", launchYear='" + launchYear + '\'' +
                ", mostFamousUser='" + mostFamousUser + '\'' +
                ", primaryColor='" + primaryColor + '\'' +
                ", colorOrFinish='" + colorOrFinish + '\'' +
                ", guitarType='" + guitarType + '\'' +
                ", countryOfOrigin='" + countryOfOrigin + '\'' +
                ", pickupConfiguration='" + pickupConfiguration + '\'' +
                ", bodyWood='" + bodyWood + '\'' +
                ", neckConstruction='" + neckConstruction + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
//Brand,Model,Launch_Year,Most_Famous_User,Primary_Color_or_Finish,Guitar_Type,Country_of_Origin,Pickup_Configuration,Body_Wood,Neck_Construction,Status