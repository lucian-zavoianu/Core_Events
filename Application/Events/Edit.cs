using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Events
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime? Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var eventToEdit = await _context.Events.FindAsync(request.Id);

                if (eventToEdit == null)
                    throw new Exception("Could not find event.");

                eventToEdit.Title = request.Title ?? eventToEdit.Title;
                eventToEdit.Description = request.Description ?? eventToEdit.Description;
                eventToEdit.Category = request.Category ?? eventToEdit.Category;
                eventToEdit.Date = request.Date ?? eventToEdit.Date;
                eventToEdit.City = request.City ?? eventToEdit.City;
                eventToEdit.Venue = request.Venue ?? eventToEdit.Venue;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes.");
            }
        }
    }
}