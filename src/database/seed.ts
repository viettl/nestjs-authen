import { MigrationInterface, QueryRunner } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';

const insertPermissionQueries = fs
  .readFileSync(path.resolve(__dirname, '../../scripts/sql/insert.sql'))
  .toString()
  .replace(/(\r\n|\n|\r)/gm, ' ') // remove newlines
  .replace(/\s+/g, ' '); // excess white space

export class init1591103087130 implements MigrationInterface {
  name = 'init1591103087130';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."RoleTemp" ("idx" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text, "created_on" TIMESTAMP DEFAULT now(), "is_active" boolean DEFAULT true, "role_type" text, "created_by" uuid NOT NULL, "status" text, "alias" text, "operation" text, "rejection_reason" text, "id" SERIAL NOT NULL, "is_obsolete" boolean NOT NULL DEFAULT false, "modified_on" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, "role_id" integer, CONSTRAINT "UQ_835baad60041a3413f9ef95bc07" UNIQUE ("idx"), CONSTRAINT "PK_a76dd0012be252eefbdd4a2a589" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "RoleTemp_idx_key" ON "public"."RoleTemp" ("idx") `,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."PermissionRoleTemp" ("idx" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_on" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "permission_base_name" text, "id" SERIAL NOT NULL, "is_obsolete" boolean NOT NULL DEFAULT false, "modified_on" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, "role_id" integer NOT NULL, "permission_id" integer NOT NULL, CONSTRAINT "PK_c1f2648a18ac911e096f08c187d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."Permission" ("idx" uuid NOT NULL DEFAULT uuid_generate_v4(), "base_name" text NOT NULL, "url" text NOT NULL, "method" text NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "is_active" boolean NOT NULL DEFAULT true, "permission_type" text, "alias" text NOT NULL, "id" SERIAL NOT NULL, "is_obsolete" boolean NOT NULL DEFAULT false, "modified_on" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_28657fa560adca66b359c18b952" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."PermissionRole" ("idx" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_on" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "is_active" boolean NOT NULL DEFAULT true, "permission_base_name" text NOT NULL, "id" SERIAL NOT NULL, "is_obsolete" boolean NOT NULL DEFAULT false, "modified_on" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, "role_id" integer NOT NULL, "permission_id" integer NOT NULL, CONSTRAINT "PK_b5e2271c229f65f17ee93677a0f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."UserRole" ("idx" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_on" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "is_active" boolean NOT NULL DEFAULT true, "id" SERIAL NOT NULL, "is_obsolete" boolean NOT NULL DEFAULT false, "modified_on" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, "role_id" integer NOT NULL, "company_user_id" integer NOT NULL, CONSTRAINT "PK_431fc1ec3d46ac513ef3701604e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."UsersTemp" ("idx" uuid DEFAULT uuid_generate_v1(), "username" text, "first_name" text, "middle_name" text, "last_name" text, "password" text, "email" text, "address" text, "phone_number" text, "phone_ext" text, "company_idx" uuid, "is_superadmin" boolean NOT NULL DEFAULT false, "operation" text, "created_by" text, "status" text, "rejection_reason" text, "created_on" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "is_active" boolean NOT NULL DEFAULT true, "id" SERIAL NOT NULL, "is_obsolete" boolean NOT NULL DEFAULT false, "modified_on" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, "role_id" integer, "user_id" integer, CONSTRAINT "PK_9d3fbcec3cc0b054324f93da038" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."Role" ("idx" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "alias" text NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "is_active" boolean NOT NULL DEFAULT true, "role_type" text, "created_by" uuid NOT NULL, "id" SERIAL NOT NULL, "is_obsolete" boolean NOT NULL DEFAULT false, "modified_on" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "UQ_c9a53325a7642edb5f9bd44f5aa" UNIQUE ("idx"), CONSTRAINT "PK_422113329ddec949e76c7943c56" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "Role_idx_key" ON "public"."Role" ("idx") `,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."Users" ("idx" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" text NOT NULL, "first_name" text NOT NULL, "middle_name" text, "last_name" text NOT NULL, "password" text NOT NULL, "email" text, "address" text, "phone_number" text, "phone_ext" text, "company_idx" uuid, "created_on" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "is_active" boolean NOT NULL DEFAULT true, "is_superadmin" boolean NOT NULL DEFAULT false, "id" SERIAL NOT NULL, "is_obsolete" boolean NOT NULL DEFAULT false, "modified_on" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, "role_id" integer NOT NULL, CONSTRAINT "PK_ac3c96e3c912cbda773b7c7edc9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."CompanyUser" ("id" SERIAL NOT NULL, "is_obsolete" boolean NOT NULL DEFAULT false, "modified_on" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, "idx" uuid NOT NULL DEFAULT uuid_generate_v4(), "company_idx" uuid, "created_on" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "is_active" boolean NOT NULL DEFAULT true, "user_id" integer, CONSTRAINT "PK_4a915d69bf079a8e5dd10784cc3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."RoleTemp" ADD CONSTRAINT "FK_d304588d17c9349ca6e7ebee5d3" FOREIGN KEY ("role_id") REFERENCES "public"."Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."PermissionRoleTemp" ADD CONSTRAINT "FK_7e7cdde853500f56b3db43fc258" FOREIGN KEY ("role_id") REFERENCES "public"."RoleTemp"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."PermissionRoleTemp" ADD CONSTRAINT "FK_0068d3de1c59050561d35f17544" FOREIGN KEY ("permission_id") REFERENCES "public"."Permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."PermissionRole" ADD CONSTRAINT "FK_5b57492441a568bc7562fbbaa5b" FOREIGN KEY ("role_id") REFERENCES "public"."Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."PermissionRole" ADD CONSTRAINT "FK_1951a810af06342fcd4530ec61c" FOREIGN KEY ("permission_id") REFERENCES "public"."Permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."UserRole" ADD CONSTRAINT "FK_fb09d73b0dd011be81a272e1efa" FOREIGN KEY ("role_id") REFERENCES "public"."Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."UserRole" ADD CONSTRAINT "FK_b221977a41587e58d7c58e16db0" FOREIGN KEY ("company_user_id") REFERENCES "public"."CompanyUser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."UsersTemp" ADD CONSTRAINT "FK_6d74dfaddaa94e1bba0c8c12a2f" FOREIGN KEY ("role_id") REFERENCES "public"."Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."UsersTemp" ADD CONSTRAINT "FK_e5b2930fe35042dab17945bb131" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."Users" ADD CONSTRAINT "FK_34be125e29cee0e71d58456aed7" FOREIGN KEY ("role_id") REFERENCES "public"."Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."CompanyUser" ADD CONSTRAINT "FK_1354e3e408b5ffdebe476a6fbd2" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(insertPermissionQueries);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."CompanyUser" DROP CONSTRAINT "FK_1354e3e408b5ffdebe476a6fbd2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."Users" DROP CONSTRAINT "FK_34be125e29cee0e71d58456aed7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."UsersTemp" DROP CONSTRAINT "FK_e5b2930fe35042dab17945bb131"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."UsersTemp" DROP CONSTRAINT "FK_6d74dfaddaa94e1bba0c8c12a2f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."UserRole" DROP CONSTRAINT "FK_b221977a41587e58d7c58e16db0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."UserRole" DROP CONSTRAINT "FK_fb09d73b0dd011be81a272e1efa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."PermissionRole" DROP CONSTRAINT "FK_1951a810af06342fcd4530ec61c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."PermissionRole" DROP CONSTRAINT "FK_5b57492441a568bc7562fbbaa5b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."PermissionRoleTemp" DROP CONSTRAINT "FK_0068d3de1c59050561d35f17544"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."PermissionRoleTemp" DROP CONSTRAINT "FK_7e7cdde853500f56b3db43fc258"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."RoleTemp" DROP CONSTRAINT "FK_d304588d17c9349ca6e7ebee5d3"`,
    );
    await queryRunner.query(`DROP TABLE "public"."CompanyUser"`);
    await queryRunner.query(`DROP TABLE "public"."Users"`);
    await queryRunner.query(`DROP INDEX "public"."Role_idx_key"`);
    await queryRunner.query(`DROP TABLE "public"."Role"`);
    await queryRunner.query(`DROP TABLE "public"."UsersTemp"`);
    await queryRunner.query(`DROP TABLE "public"."UserRole"`);
    await queryRunner.query(`DROP TABLE "public"."PermissionRole"`);
    await queryRunner.query(`DROP TABLE "public"."Permission"`);
    await queryRunner.query(`DROP TABLE "public"."PermissionRoleTemp"`);
    await queryRunner.query(`DROP INDEX "public"."RoleTemp_idx_key"`);
    await queryRunner.query(`DROP TABLE "public"."RoleTemp"`);
  }
}
