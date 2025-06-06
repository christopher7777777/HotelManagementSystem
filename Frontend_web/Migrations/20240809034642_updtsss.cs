using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Wandermate.Migrations
{
    /// <inheritdoc />
    public partial class updtsss : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "HotelId",
                table: "Review",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Review_HotelId",
                table: "Review",
                column: "HotelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Review_Hotel_HotelId",
                table: "Review",
                column: "HotelId",
                principalTable: "Hotel",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Review_Hotel_HotelId",
                table: "Review");

            migrationBuilder.DropIndex(
                name: "IX_Review_HotelId",
                table: "Review");

            migrationBuilder.DropColumn(
                name: "HotelId",
                table: "Review");
        }
    }
}
