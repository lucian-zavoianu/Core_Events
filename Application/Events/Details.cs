using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Events
{
    public class Details
    {
        public class Query : IRequest<Event>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Event>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Event> Handle(Query request, CancellationToken cancellationToken)
            {
                var eventDetail = await _context.Events.FindAsync(request.Id);

                return eventDetail;
            }
        }
    }
}