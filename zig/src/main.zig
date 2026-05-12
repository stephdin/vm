const std = @import("std");

pub fn main(init: std.process.Init) !void {
    const io = init.io;
    var buf: [10240]u8 = undefined;

    const contents = std.Io.Dir.readFile(
        std.Io.Dir.cwd(),
        io,
        "./code/simple_add.val",
        &buf,
    ) catch |err| switch (err) {
        error.FileNotFound => {
            std.debug.print("Fehler: Datei 'simple_add.val' nicht gefunden\n", .{});
            return;
        },
        else => return err,
    };

    std.debug.print("{s}\n", .{contents});
}
