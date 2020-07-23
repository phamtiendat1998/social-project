import { RelationshipType } from './../enums/relationship-type.enum';
export interface RelationshipField {
    rela: RelationshipType;
    with: string;
    link: string;
    public: boolean;
}
