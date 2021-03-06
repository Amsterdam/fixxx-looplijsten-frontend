declare namespace Components {
    namespace Schemas {
        export type BlankEnum = "";
        export interface Case {
            id: string;
            data: string;
            fraud_prediction: {
                fraud_prediction_model?: FraudPredictionModelEnum | BlankEnum | NullEnum;
                fraud_probability: number; // float
                fraud_prediction: boolean;
                business_rules: {
                    [name: string]: any;
                };
                shap_values: {
                    [name: string]: any;
                };
                sync_date: string; // date-time
            };
        }
        export interface CaseEvent {
            id: number;
            date_created: string; // date-time
            case: number;
            type: string;
            emitter_id: number;
            event_values: {
                [name: string]: any;
            };
        }
        export interface CaseReason {
            id: number;
            name: string;
            team: number;
        }
        export interface CaseSimple {
            id: string;
        }
        export interface CaseStateType {
            id: number;
            name: string;
            team: number;
        }
        export interface DaySettings {
            id: number;
            name: string;
            week_day?: WeekDayEnum | NullEnum;
            week_days?: number[] | null;
            opening_date?: string; // date
            postal_code_ranges?: {
                [name: string]: any;
            };
            postal_code_ranges_presets?: number[];
            length_of_list?: number;
            day_segments?: number[] | null;
            week_segments?: number[] | null;
            priorities?: number[] | null;
            reasons?: number[] | null;
            state_types?: number[] | null;
            projects?: number[];
            primary_stadium?: null | number;
            secondary_stadia?: number[];
            exclude_stadia?: number[];
            team_settings: {
                id: number;
                name: string;
                use_zaken_backend?: boolean;
                /**
                 * enables fraudprediction A/B testing for this theme on AZA cases
                 */
                fraudprediction_pilot_enabled?: boolean;
                zaken_team_name?: string | null;
                observation_choices: Observation[];
                situation_choices: any[];
                suggest_next_visit_choices: SuggestNextVisit[];
                fraud_prediction_model?: FraudPredictionModelEnum | BlankEnum | NullEnum;
                marked_stadia: StadiumLabel[];
                show_issuemelding?: boolean;
                show_vakantieverhuur?: boolean;
            };
            sia_presedence?: boolean;
            used_today_count: number;
            max_use_limit?: number;
        }
        export interface DaySettingsCompact {
            id: number;
            name: string;
            week_days: number[];
            used_today_count: number;
            max_use_limit?: number;
            team_settings: {
                id: number;
                name: string;
                use_zaken_backend?: boolean;
                /**
                 * enables fraudprediction A/B testing for this theme on AZA cases
                 */
                fraudprediction_pilot_enabled?: boolean;
                zaken_team_name?: string | null;
                observation_choices: Observation[];
                situation_choices: any[];
                suggest_next_visit_choices: SuggestNextVisit[];
                fraud_prediction_model?: FraudPredictionModelEnum | BlankEnum | NullEnum;
                marked_stadia: StadiumLabel[];
                show_issuemelding?: boolean;
                show_vakantieverhuur?: boolean;
            };
        }
        export interface Decos {
            permits: DecosPermit[];
            vakantieverhuur_meldingen: {
                rented_days_count: null | number;
                planned_days_count: null | number;
                is_rented_today: boolean;
                meldingen: VakantieverhuurMelding[];
            } | null;
        }
        export interface DecosPermit {
            permit_granted: HasVacationRentalPermitEnum;
            permit_type: string;
            decos_join_web_url?: string; // uri
            raw_data?: {
                [name: string]: any;
            } | null;
            details?: {
                [name: string]: any;
            } | null;
        }
        export interface FraudPrediction {
            fraud_prediction_model?: FraudPredictionModelEnum | BlankEnum | NullEnum;
            fraud_probability: number; // float
            fraud_prediction: boolean;
            business_rules: {
                [name: string]: any;
            };
            shap_values: {
                [name: string]: any;
            };
            sync_date: string; // date-time
        }
        export type FraudPredictionModelEnum = "vakantieverhuur" | "onderhuur";
        export type HasVacationRentalPermitEnum = "True" | "False" | "UNKNOWN";
        export interface Itinerary {
            id: number;
            created_at: string; // date
            team_members: ItineraryTeamMember[];
            items: ItineraryItem[];
            settings: {
                opening_date: string; // date
                day_settings: DaySettings;
                target_length?: number;
                start_case?: CaseSimple;
                day_segments?: number[] | null;
                week_segments?: number[] | null;
                priorities?: number[] | null;
                reasons?: number[] | null;
                state_types?: number[] | null;
                projects: Project[];
                primary_stadium: Stadium;
                secondary_stadia: Stadium[];
                exclude_stadia: Stadium[];
            };
            postal_code_settings: PostalCodeSettings[];
        }
        export interface ItineraryItem {
            id: number;
            position: number; // float
            notes: Note[];
            case: {
                id: string;
                data: string;
                fraud_prediction: {
                    fraud_prediction_model?: FraudPredictionModelEnum | BlankEnum | NullEnum;
                    fraud_probability: number; // float
                    fraud_prediction: boolean;
                    business_rules: {
                        [name: string]: any;
                    };
                    shap_values: {
                        [name: string]: any;
                    };
                    sync_date: string; // date-time
                };
            };
            visits: Visit[];
        }
        export interface ItinerarySettings {
            opening_date: string; // date
            day_settings: DaySettings;
            target_length?: number;
            start_case?: CaseSimple;
            day_segments?: number[] | null;
            week_segments?: number[] | null;
            priorities?: number[] | null;
            reasons?: number[] | null;
            state_types?: number[] | null;
            projects: Project[];
            primary_stadium: Stadium;
            secondary_stadia: Stadium[];
            exclude_stadia: Stadium[];
        }
        export interface ItineraryTeamMember {
            id: number;
            user: {
                id: string; // uuid
                email: string; // email
                username: string;
                first_name: string;
                last_name: string;
                full_name: string;
                team_settings: UserTeamSettingsId[];
            };
        }
        export interface Note {
            id: number;
            text: string;
            author: {
                id: string; // uuid
                email: string; // email
                username: string;
                first_name: string;
                last_name: string;
                full_name: string;
                team_settings: UserTeamSettingsId[];
            };
        }
        export interface NoteCrud {
            id: number;
            text: string;
            itinerary_item: number;
            author: {
                id: string; // uuid
                email: string; // email
                username: string;
                first_name: string;
                last_name: string;
                full_name: string;
                team_settings: UserTeamSettingsId[];
            };
        }
        export type NullEnum = null;
        export interface OIDCAuthenticate {
            code: string;
        }
        export interface Observation {
            value: string;
            verbose: string;
        }
        export interface PaginatedCaseReasonList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results?: CaseReason[];
        }
        export interface PaginatedCaseStateTypeList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results?: CaseStateType[];
        }
        export interface PaginatedDaySettingsList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results?: DaySettings[];
        }
        export interface PaginatedItineraryList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results?: Itinerary[];
        }
        export interface PaginatedObservationList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results?: Observation[];
        }
        export interface PaginatedPostalCodeRangePresetList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results?: PostalCodeRangePreset[];
        }
        export interface PaginatedSuggestNextVisitList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results?: SuggestNextVisit[];
        }
        export interface PaginatedTeamSettingsList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results?: TeamSettings[];
        }
        export interface PaginatedUserList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results?: User[];
        }
        export interface PaginatedVisitList {
            /**
             * example:
             * 123
             */
            count?: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results?: Visit[];
        }
        export interface PatchedDaySettings {
            id?: number;
            name?: string;
            week_day?: WeekDayEnum | NullEnum;
            week_days?: number[] | null;
            opening_date?: string; // date
            postal_code_ranges?: {
                [name: string]: any;
            };
            postal_code_ranges_presets?: number[];
            length_of_list?: number;
            day_segments?: number[] | null;
            week_segments?: number[] | null;
            priorities?: number[] | null;
            reasons?: number[] | null;
            state_types?: number[] | null;
            projects?: number[];
            primary_stadium?: null | number;
            secondary_stadia?: number[];
            exclude_stadia?: number[];
            team_settings?: {
                id: number;
                name: string;
                use_zaken_backend?: boolean;
                /**
                 * enables fraudprediction A/B testing for this theme on AZA cases
                 */
                fraudprediction_pilot_enabled?: boolean;
                zaken_team_name?: string | null;
                observation_choices: Observation[];
                situation_choices: any[];
                suggest_next_visit_choices: SuggestNextVisit[];
                fraud_prediction_model?: FraudPredictionModelEnum | BlankEnum | NullEnum;
                marked_stadia: StadiumLabel[];
                show_issuemelding?: boolean;
                show_vakantieverhuur?: boolean;
            };
            sia_presedence?: boolean;
            used_today_count?: number;
            max_use_limit?: number;
        }
        export interface PatchedItineraryItem {
            id?: number;
            position?: number; // float
            notes?: Note[];
            case?: {
                id: string;
                data: string;
                fraud_prediction: {
                    fraud_prediction_model?: FraudPredictionModelEnum | BlankEnum | NullEnum;
                    fraud_probability: number; // float
                    fraud_prediction: boolean;
                    business_rules: {
                        [name: string]: any;
                    };
                    shap_values: {
                        [name: string]: any;
                    };
                    sync_date: string; // date-time
                };
            };
            visits?: Visit[];
        }
        export interface PatchedNoteCrud {
            id?: number;
            text?: string;
            itinerary_item?: number;
            author?: {
                id: string; // uuid
                email: string; // email
                username: string;
                first_name: string;
                last_name: string;
                full_name: string;
                team_settings: UserTeamSettingsId[];
            };
        }
        export interface PatchedObservation {
            value?: string;
            verbose?: string;
        }
        export interface PatchedPostalCodeRangePreset {
            id?: number;
            name?: string;
            postal_code_ranges_presets?: PostalCodeRange[];
        }
        export interface PatchedSuggestNextVisit {
            value?: string;
            verbose?: string;
        }
        export interface PatchedTeamSettings {
            id?: number;
            name?: string;
            use_zaken_backend?: boolean;
            /**
             * enables fraudprediction A/B testing for this theme on AZA cases
             */
            fraudprediction_pilot_enabled?: boolean;
            zaken_team_name?: string | null;
            observation_choices?: Observation[];
            situation_choices?: any[];
            suggest_next_visit_choices?: SuggestNextVisit[];
            project_choices?: string[];
            stadia_choices?: string[];
            marked_stadia?: StadiumLabel[];
            day_settings_list?: DaySettingsCompact[];
            fraud_prediction_model?: FraudPredictionModelEnum | BlankEnum | NullEnum;
        }
        export interface PatchedVisit {
            id?: number;
            team_members?: VisitTeamMember[];
            case_id?: string;
            situation?: string | null;
            observations?: string[] | null;
            start_time?: string; // date-time
            description?: string | null;
            can_next_visit_go_ahead?: boolean | null;
            can_next_visit_go_ahead_description?: string | null;
            suggest_next_visit?: string | null;
            suggest_next_visit_description?: string | null;
            personal_notes?: string | null;
            itinerary_item?: null | number;
            author?: string; // uuid
        }
        export interface PermitCheckmark {
            has_b_and_b_permit: HasVacationRentalPermitEnum;
            has_vacation_rental_permit: HasVacationRentalPermitEnum;
        }
        export interface PostalCodeRange {
            range_start?: number;
            range_end?: number;
        }
        export interface PostalCodeRangePreset {
            id: number;
            name: string;
            postal_code_ranges_presets: PostalCodeRange[];
        }
        export interface PostalCodeSettings {
            range_start: number;
            range_end: number;
        }
        export interface Project {
            name: string;
        }
        export interface Stadium {
            name: string;
        }
        export interface StadiumLabel {
            stadium: string;
            label?: string;
        }
        export interface SuggestNextVisit {
            value: string;
            verbose: string;
        }
        export interface TeamScheduleTypes {
            actions: any[];
            day_segments: any[];
            priorities: any[];
            week_segments: any[];
        }
        export interface TeamSettings {
            id: number;
            name: string;
            use_zaken_backend?: boolean;
            /**
             * enables fraudprediction A/B testing for this theme on AZA cases
             */
            fraudprediction_pilot_enabled?: boolean;
            zaken_team_name?: string | null;
            observation_choices: Observation[];
            situation_choices: any[];
            suggest_next_visit_choices: SuggestNextVisit[];
            project_choices: string[];
            stadia_choices: string[];
            marked_stadia: StadiumLabel[];
            day_settings_list: DaySettingsCompact[];
            fraud_prediction_model?: FraudPredictionModelEnum | BlankEnum | NullEnum;
        }
        export interface TeamSettingsCompact {
            id: number;
            name: string;
            use_zaken_backend?: boolean;
            /**
             * enables fraudprediction A/B testing for this theme on AZA cases
             */
            fraudprediction_pilot_enabled?: boolean;
            zaken_team_name?: string | null;
            observation_choices: Observation[];
            situation_choices: any[];
            suggest_next_visit_choices: SuggestNextVisit[];
            fraud_prediction_model?: FraudPredictionModelEnum | BlankEnum | NullEnum;
            marked_stadia: StadiumLabel[];
            show_issuemelding?: boolean;
            show_vakantieverhuur?: boolean;
        }
        export interface User {
            id: string; // uuid
            email: string; // email
            username: string;
            first_name: string;
            last_name: string;
            full_name: string;
            team_settings: UserTeamSettingsId[];
        }
        export interface UserTeamSettingsId {
            id: number;
        }
        export interface VakantieverhuurMelding {
            is_afmelding: boolean;
            melding_date: string; // date-time
            check_in_date: string; // date-time
            check_out_date: string; // date-time
        }
        export interface VakantieverhuurRentalInformation {
            rented_days_count: null | number;
            planned_days_count: null | number;
            is_rented_today: boolean;
            meldingen: VakantieverhuurMelding[];
        }
        export interface Visit {
            id: number;
            team_members: VisitTeamMember[];
            case_id: string;
            situation?: string | null;
            observations?: string[] | null;
            start_time: string; // date-time
            description?: string | null;
            can_next_visit_go_ahead?: boolean | null;
            can_next_visit_go_ahead_description?: string | null;
            suggest_next_visit?: string | null;
            suggest_next_visit_description?: string | null;
            personal_notes?: string | null;
            itinerary_item?: null | number;
            author: string; // uuid
        }
        export interface VisitTeamMember {
            id: number;
            user: {
                id: string; // uuid
                email: string; // email
                username: string;
                first_name: string;
                last_name: string;
                full_name: string;
                team_settings: UserTeamSettingsId[];
            };
        }
        export type WeekDayEnum = 0 | 1 | 2 | 3 | 4 | 5 | 6;
    }
}
declare namespace Paths {
    namespace CasesEventsRetrieve {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CaseEvent;
        }
    }
    namespace CasesRetrieve {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace CasesUnplannedRetrieve {
        namespace Parameters {
            export type Date = string; // date
            export type Stadium = string;
        }
        export interface QueryParameters {
            date?: Parameters.Date /* date */;
            stadium?: Parameters.Stadium;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace CasesVisitsList {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Visit[];
        }
    }
    namespace DaySettingsCreate {
        export type RequestBody = Components.Schemas.DaySettings;
        namespace Responses {
            export type $201 = Components.Schemas.DaySettings;
        }
    }
    namespace DaySettingsDestroy {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace DaySettingsList {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedDaySettingsList;
        }
    }
    namespace DaySettingsPartialUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.PatchedDaySettings;
        namespace Responses {
            export type $200 = Components.Schemas.DaySettings;
        }
    }
    namespace DaySettingsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DaySettings;
        }
    }
    namespace DaySettingsUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.DaySettings;
        namespace Responses {
            export type $200 = Components.Schemas.DaySettings;
        }
    }
    namespace DecosDetailsRetrieve {
        namespace Parameters {
            export type BagId = string;
        }
        export interface QueryParameters {
            bag_id: Parameters.BagId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Decos;
        }
    }
    namespace DecosTestConnectRetrieve {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace FraudPredictionScoringCreate {
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace IsAuthorizedRetrieve {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace ItinerariesCreate {
        export type RequestBody = Components.Schemas.Itinerary;
        namespace Responses {
            export type $201 = Components.Schemas.Itinerary;
        }
    }
    namespace ItinerariesDestroy {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace ItinerariesList {
        namespace Parameters {
            export type CreatedAt = string; // date
            export type Page = number;
        }
        export interface QueryParameters {
            created_at?: Parameters.CreatedAt /* date */;
            page?: Parameters.Page;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedItineraryList;
        }
    }
    namespace ItinerariesSuggestionsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Itinerary;
        }
    }
    namespace ItinerariesTeamRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Itinerary;
        }
    }
    namespace ItinerariesTeamUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Itinerary;
        namespace Responses {
            export type $200 = Components.Schemas.Itinerary;
        }
    }
    namespace ItineraryItemsCreate {
        export type RequestBody = Components.Schemas.ItineraryItem;
        namespace Responses {
            export type $201 = Components.Schemas.ItineraryItem;
        }
    }
    namespace ItineraryItemsDestroy {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace ItineraryItemsPartialUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.PatchedItineraryItem;
        namespace Responses {
            export type $200 = Components.Schemas.ItineraryItem;
        }
    }
    namespace ItineraryItemsUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.ItineraryItem;
        namespace Responses {
            export type $200 = Components.Schemas.ItineraryItem;
        }
    }
    namespace NotesCreate {
        export type RequestBody = Components.Schemas.NoteCrud;
        namespace Responses {
            export type $201 = Components.Schemas.NoteCrud;
        }
    }
    namespace NotesDestroy {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace NotesPartialUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.PatchedNoteCrud;
        namespace Responses {
            export type $200 = Components.Schemas.NoteCrud;
        }
    }
    namespace NotesRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.NoteCrud;
        }
    }
    namespace NotesUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.NoteCrud;
        namespace Responses {
            export type $200 = Components.Schemas.NoteCrud;
        }
    }
    namespace ObservationsCreate {
        export type RequestBody = Components.Schemas.Observation;
        namespace Responses {
            export type $201 = Components.Schemas.Observation;
        }
    }
    namespace ObservationsDestroy {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace ObservationsList {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedObservationList;
        }
    }
    namespace ObservationsPartialUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.PatchedObservation;
        namespace Responses {
            export type $200 = Components.Schemas.Observation;
        }
    }
    namespace ObservationsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Observation;
        }
    }
    namespace ObservationsUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Observation;
        namespace Responses {
            export type $200 = Components.Schemas.Observation;
        }
    }
    namespace OidcAuthenticateCreate {
        export type RequestBody = Components.Schemas.OIDCAuthenticate;
        namespace Responses {
            export type $200 = Components.Schemas.OIDCAuthenticate;
        }
    }
    namespace PermitsCheckmarksRetrieve {
        namespace Parameters {
            export type BagId = string;
        }
        export interface QueryParameters {
            bag_id: Parameters.BagId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PermitCheckmark;
        }
    }
    namespace PermitsDetailsList {
        namespace Parameters {
            export type BagId = string;
        }
        export interface QueryParameters {
            bag_id: Parameters.BagId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DecosPermit[];
        }
    }
    namespace PostalCodeRangesPresetsCreate {
        export type RequestBody = Components.Schemas.PostalCodeRangePreset;
        namespace Responses {
            export type $201 = Components.Schemas.PostalCodeRangePreset;
        }
    }
    namespace PostalCodeRangesPresetsDestroy {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace PostalCodeRangesPresetsList {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedPostalCodeRangePresetList;
        }
    }
    namespace PostalCodeRangesPresetsPartialUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.PatchedPostalCodeRangePreset;
        namespace Responses {
            export type $200 = Components.Schemas.PostalCodeRangePreset;
        }
    }
    namespace PostalCodeRangesPresetsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PostalCodeRangePreset;
        }
    }
    namespace PostalCodeRangesPresetsUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.PostalCodeRangePreset;
        namespace Responses {
            export type $200 = Components.Schemas.PostalCodeRangePreset;
        }
    }
    namespace SearchRetrieve {
        namespace Parameters {
            export type PostalCode = string;
            export type StreetName = string;
            export type StreetNumber = string;
            export type Suffix = string;
        }
        export interface QueryParameters {
            postalCode?: Parameters.PostalCode;
            streetName?: Parameters.StreetName;
            streetNumber?: Parameters.StreetNumber;
            suffix?: Parameters.Suffix;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace SuggestNextVisitCreate {
        export type RequestBody = Components.Schemas.SuggestNextVisit;
        namespace Responses {
            export type $201 = Components.Schemas.SuggestNextVisit;
        }
    }
    namespace SuggestNextVisitDestroy {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace SuggestNextVisitList {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedSuggestNextVisitList;
        }
    }
    namespace SuggestNextVisitPartialUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.PatchedSuggestNextVisit;
        namespace Responses {
            export type $200 = Components.Schemas.SuggestNextVisit;
        }
    }
    namespace SuggestNextVisitRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.SuggestNextVisit;
        }
    }
    namespace SuggestNextVisitUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.SuggestNextVisit;
        namespace Responses {
            export type $200 = Components.Schemas.SuggestNextVisit;
        }
    }
    namespace TeamSettingsCreate {
        export type RequestBody = Components.Schemas.TeamSettings;
        namespace Responses {
            export type $201 = Components.Schemas.TeamSettings;
        }
    }
    namespace TeamSettingsDestroy {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace TeamSettingsList {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedTeamSettingsList;
        }
    }
    namespace TeamSettingsPartialUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.PatchedTeamSettings;
        namespace Responses {
            export type $200 = Components.Schemas.TeamSettings;
        }
    }
    namespace TeamSettingsReasonsList {
        namespace Parameters {
            export type Id = number;
            export type Page = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseReasonList;
        }
    }
    namespace TeamSettingsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.TeamSettings;
        }
    }
    namespace TeamSettingsScheduleTypesRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.TeamScheduleTypes;
        }
    }
    namespace TeamSettingsStateTypesList {
        namespace Parameters {
            export type Id = number;
            export type Page = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseStateTypeList;
        }
    }
    namespace TeamSettingsUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.TeamSettings;
        namespace Responses {
            export type $200 = Components.Schemas.TeamSettings;
        }
    }
    namespace UsersList {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedUserList;
        }
    }
    namespace VisitsCreate {
        export type RequestBody = Components.Schemas.Visit;
        namespace Responses {
            export type $201 = Components.Schemas.Visit;
        }
    }
    namespace VisitsDestroy {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace VisitsList {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedVisitList;
        }
    }
    namespace VisitsPartialUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.PatchedVisit;
        namespace Responses {
            export type $200 = Components.Schemas.Visit;
        }
    }
    namespace VisitsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Visit;
        }
    }
    namespace VisitsUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Visit;
        namespace Responses {
            export type $200 = Components.Schemas.Visit;
        }
    }
}
