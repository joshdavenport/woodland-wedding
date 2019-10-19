/**
 * ------------------------------------------------------------------------
 * ------------------------------------------------------------------------
 * ------------------------------------------------------------------------
 * TDOO: babel!!!!
 * ------------------------------------------------------------------------
 * ------------------------------------------------------------------------
 * ------------------------------------------------------------------------
 */

(function () {

    function getElementVariables (id) {
        const $element = $(`#${id}`);

        return {
            $el: $element,
            position: $element.position(),
            sizing: { width: $element.outerWidth(), height: $element.outerHeight() }
        };
    }

    $(function () {

        var $body = $('body');
        const $main = $('.page-content');

        $body.addClass('ready');

        const dFootpath = d3.select('#footpath');

        function drawWalkway () {
            dFootpath.selectAll('*').remove();

            dFootpath.attr('width', $main.width())
                .attr('height', $main.height());

            const elementDateLocation = getElementVariables('date-location');
            const elementRsvp = getElementVariables('name-rsvp');
            const elementCountdown = getElementVariables('box-content-sign-count');
            const elementOurWeddingDay = getElementVariables('box-content-our-wedding-day');
            const elementForest = getElementVariables('box-forest');
            const elementImportantBits = getElementVariables('box-content-important-bits');
            const elementSchedule = getElementVariables('box-content-schedule');
            const elementAccommodation = getElementVariables('box-content-accommodation');
            const elementGiftRegistry = getElementVariables('box-content-gift-registry');
            const elementSongRequests = getElementVariables('box-content-song-requests');

            const points = [
                {
                    x: $main.width() * 0.1,
                    y: 0
                },
                {
                    x: $main.width() * 0.12,
                    y: elementDateLocation.position.top - (elementDateLocation.sizing.height * 0.5)
                },
                {
                    x: elementDateLocation.position.left + (elementDateLocation.sizing.width * 0.1),
                    y: elementDateLocation.position.top - (elementDateLocation.sizing.height * 0.2)
                },
                {
                    x: elementDateLocation.position.left + (elementDateLocation.sizing.width * 0.3),
                    y: elementDateLocation.position.top + (elementDateLocation.sizing.height * 0.4)
                },
                {
                    x: elementRsvp.position.left + (elementRsvp.sizing.width * 0.5),
                    y: elementRsvp.position.top + (elementRsvp.sizing.height * 0.5)
                },
                {
                    x: elementCountdown.position.left + (elementCountdown.sizing.width * 0.2),
                    y: elementCountdown.position.top + (elementCountdown.sizing.height * 0.5)
                },
                {
                    x: elementOurWeddingDay.position.left,
                    y: elementOurWeddingDay.position.top + (elementOurWeddingDay.sizing.height * 0.1)
                },
                {
                    x: elementOurWeddingDay.position.left,
                    y: elementOurWeddingDay.position.top + (elementOurWeddingDay.sizing.height * 1.1)
                },
                {
                    x: elementForest.position.left + (elementForest.sizing.width * 0.4),
                    y: elementForest.position.top + (elementForest.sizing.height * 0.8)
                },
                {
                    x: elementImportantBits.position.left + (elementImportantBits.sizing.width * 1.2),
                    y: elementImportantBits.position.top
                },
                {
                    x: elementImportantBits.position.left + (elementImportantBits.sizing.width * 1.2),
                    y: elementImportantBits.position.top + (elementImportantBits.sizing.height * 0.9)
                },
                {
                    x: elementSchedule.position.left - (elementSchedule.sizing.width * 0.7),
                    y: elementSchedule.position.top + (elementSchedule.sizing.height * 0.2)
                },
                {
                    x: elementSchedule.position.left - (elementSchedule.sizing.width * 0.7),
                    y: elementSchedule.position.top + (elementSchedule.sizing.height * 0.9)
                },
                {
                    x: elementAccommodation.position.left + (elementAccommodation.sizing.width * 1.4),
                    y: elementAccommodation.position.top + (elementAccommodation.sizing.height * 0.2)
                },
                {
                    x: elementAccommodation.position.left + (elementAccommodation.sizing.width * 1.4),
                    y: elementAccommodation.position.top + (elementAccommodation.sizing.height * 0.9)
                },
                {
                    x: elementGiftRegistry.position.left - (elementGiftRegistry.sizing.width * 0.7),
                    y: elementGiftRegistry.position.top + (elementGiftRegistry.sizing.height * 0.2)
                },
                {
                    x: elementGiftRegistry.position.left - (elementGiftRegistry.sizing.width * 0.7),
                    y: elementGiftRegistry.position.top + (elementGiftRegistry.sizing.height * 0.9)
                },
                {
                    x: elementSongRequests.position.left + (elementSongRequests.sizing.width * 1.4),
                    y: elementSongRequests.position.top + (elementSongRequests.sizing.height * 0.5)
                },
                {
                    x: elementSongRequests.position.left + (elementSongRequests.sizing.width * 1.4),
                    y: elementSongRequests.position.top + (elementSongRequests.sizing.height * 1)
                },
                {
                    x: elementSongRequests.position.left + (elementSongRequests.sizing.width * 1),
                    y: $main.height() * 1.2
                }
            ];

            // Generate interpolated line from points
            const guideLine = d3.line()
                .curve(d3.curveNatural)
                .x(d => d.x)
                .y(d => d.y);

            // SVG groups
            const guideGroup = dFootpath.append('g');
            const feetGroup = dFootpath.append('g');

            const guidePath = guideGroup.append('path')
                .datum(points)
                .attr('d', guideLine)
                // .attr('stroke', '#000000')
                // .attr('stroke-width', 2)
                .attr('fill', 'none');

            const guidePathNode = guidePath.node();

            const feetCount = Math.floor(guidePathNode.getTotalLength() / 68);
            const feetGap = guidePathNode.getTotalLength() / feetCount;

            _.times(feetCount, (i) => {
                const distanceVarianceRange = 5;
                let distanceVariance = Math.floor(Math.random() * distanceVarianceRange) + 1;
                distanceVariance *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
                const pointAlongGuidePath = guidePathNode.getPointAtLength(Math.max(0, (feetGap * i) + distanceVariance));
                const p1 = pointAlongGuidePath;
                const p2 = guidePathNode.getPointAtLength(feetGap * (i + 1));
                const angleVarianceRange = 12;
                let angleVariance = Math.floor(Math.random() * angleVarianceRange) + 1;
                angleVariance *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
                const angle = (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI) - 90 + angleVariance;

                const footprint = feetGroup.append('image')
                    .attr('xlink:href', '/assets/images/footprint-assets/footprint.png')
                    .attr('width', '20')
                    .attr('height', '50')
                    .attr('transform', `translate(${pointAlongGuidePath.x}, ${pointAlongGuidePath.y}) rotate(${angle})`);
            });

            dFootpath.attr('class', 'ready');
        }

        drawWalkway();
        $(window).on('resize', function () {
            // draw.clear();
            drawWalkway();
        });


        /**
         * days
         */
        const daysLeft = dayjs('2020-08-28').diff(dayjs(), 'day') + 1;
        const $numberContainer = $('#sign-count-numbers');
        if(daysLeft < 0) {
            $('#box-content-sign-count').css('visibility', 'hidden');
        } else {
            daysLeft.toString().split('').forEach(num => {
                $numberContainer.append(`<img src="/assets/images/numbers-assets/${num}.png">`);
            });
        }

    });

})(jQuery);